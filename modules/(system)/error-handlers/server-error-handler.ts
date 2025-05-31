import { serialize } from '@/modules/(system)/error-handlers/error-handling-utils';
import logger from '@/modules/(system)/logging-facade/logger';

const logPrefix = 'server-error-handler.ts: ';

/**
 * サーバーサイドエラーハンドリング
 */
export function withErrorHandling<T>(func: () => T): T {
  try {
    // 引数に渡された関数を実行
    return func();
  } catch (error) {
    // エラーログを出力
    logger.error(logPrefix + serialize(error));
    // 再スローすることで、Next.jsが未処理の例外としてキャッチしerror.tsxをレンダリングする。
    throw error;
  }
}

/**
 * サーバーサイドエラーハンドリング（非同期処理用）
 */
export async function withErrorHandlingAsync<T>(
  func: () => Promise<T>,
): Promise<T> {
  try {
    // 引数に渡された関数を実行
    return await func();
  } catch (error) {
    logger.error(logPrefix + serialize(error));
    throw error;
  }
}
