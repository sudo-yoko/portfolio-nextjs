import { serialize } from '@/modules/(system)/error-handlers/error-handling-utils';
import logger from '@/modules/(system)/logging-facade/logger';
import { ActionResult } from '@/modules/(system)/types/server-action-interface';
import 'server-only';

const logPrefix = 'action-error-handler.ts: ';

/**
 * サーバーアクションエラーハンドリング
 */
export async function withErrorHandlingAsync<T>(thunk: () => Promise<T>): Promise<ActionResult<T>> {
  const fname = 'withErrorHandlingAsync: ';

  try {
    // 引数に渡されたサンクを呼ぶ
    const result = await thunk();
    return { abort: false, result };
  } catch (error) {
    logger.error(logPrefix + fname + serialize(error));
    return { abort: true };
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
