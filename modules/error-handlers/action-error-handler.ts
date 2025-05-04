import { serialize } from '@/modules/error-handlers/error-handling-utils';
import logger from '@/modules/logging-facade/logger';
import { ActionResult } from '@/modules/types/action-result';

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
    logger.error(serialize(error));
    return { status: 500 };
  }
}
