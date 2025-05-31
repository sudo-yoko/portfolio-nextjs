import { serialize } from '@/modules/(system)/error-handlers/error-handling-utils';
import logger from '@/modules/(system)/logging-facade/logger';
import { ActionResult } from '@/modules/(system)/types/action-result';

const logPrefix = 'action-error-handler.ts: ';

/**
 * サーバーアクションエラーハンドリング
 */
export async function withErrorHandlingAsync<T>(
  func: () => Promise<T>,
): Promise<T | ActionResult<void>> {
  try {
    // 引数に渡された関数を実行
    return await func();
  } catch (error) {
    logger.error(logPrefix + serialize(error));
    return { status: 500 };
  }
}
