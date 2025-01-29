import logger from '@/modules/loggers/logger';

/**
 * サーバーサイドエラーハンドリング
 */
export function withErrorHandling<T>(func: () => T): T {
  try {
    // 引数に渡された関数を実行
    return func();
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function withErrorHandlingAsync<T>(
  func: () => Promise<T>,
): Promise<T> {
  try {
    // 引数に渡された関数を実行
    return await func();
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
