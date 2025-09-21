//
// Server Actions エラーハンドリング
//
import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import logger from '@/presentation/(system)/logging-facade/logger';
import { ActionResult } from '@/presentation/(system)/types/action-result';
import 'server-only';

const logPrefix = 'action-error-handler.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync<T>(thunk: () => Promise<T>): Promise<ActionResult<T>> {
  const fname = 'withErrorHandlingAsync: ';

  try {
    // 引数に渡されたサンクを呼ぶ
    const result = await thunk();
    return ActionResult.complete(result);
  } catch (e) {
    const { message } = stringify(e);
    const result: ActionResult<never> = ActionResult.abort(message);

    // 再スローしないのにスタックトレースをログに出すとログがわかりづらくなる。再スローしない場合はメッセージのみログに出力する
    logger.error(logPrefix + fname + `ActionResult=${JSON.stringify(result)}`);
    return result;
  }
}

/*
export async function withErrorHandlingAsync<T>(func: () => Promise<T>): Promise<T | ActionResult<void>> {
  const fname = 'withErrorHandlingAsync: ';

  try {
    // 引数に渡された関数を実行
    return await func();
  } catch (error) {
    logger.error(logPrefix + fname + serialize(error));
    return { status: 500 };
    //return ActionResult.Error();
  }
}
*/
