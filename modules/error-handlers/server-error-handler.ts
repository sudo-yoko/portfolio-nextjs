import logger from '@/modules/loggers/logger';

/**
 * サーバーサイドエラーハンドリング
 */
export default async function withErrorHandling<T>(
  func: (() => T) | (() => Promise<T>),
): Promise<T> {
  try {
    // 引数に渡された関数を実行
    const result = func();

    // 引数に渡された関数が非同期関数の場合
    if (result instanceof Promise) {
      return await result;
    }

    // 引数に渡された関数が同期関数の場合
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
