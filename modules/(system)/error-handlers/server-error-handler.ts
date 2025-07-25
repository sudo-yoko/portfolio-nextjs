import { serialize } from '@/modules/(system)/error-handlers/error-handling-utils';
import logger from '@/modules/(system)/logging-facade/logger';
import axios from 'axios';
import 'server-only';

const logPrefix = 'server-error-handler.ts: ';

/**
 * サーバーサイドエラーハンドリング
 */
export function withErrorHandling<T>(func: () => T): T {
  const fname = 'withErrorHandling: ';

  try {
    // 引数に渡された関数を実行
    return func();
  } catch (error) {
    // エラーログを出力
    logger.error(logPrefix + fname + serialize(error));
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
  const fname = 'withErrorHandlingAsync: ';

  try {
    // 引数に渡された関数を実行
    return await func();
  } catch (error) {
    logger.error(logPrefix + fname + serialize(error));
    throw error;
  }
}

/**
 * サーバーサイドエラーハンドリング（axiosクライアント用）
 * axiosクライアントをラップし、axios固有のエラーを処理する
 *
 * @param func - axiosクライアント使った処理関数を渡す
 */
export async function withAxiosErrorHandlingAsync<T>(
  func: () => Promise<T>,
): Promise<T> {
  const fname = 'withAxiosErrorHandlingAsync: ';

  try {
    return await func();
  } catch (error) {
    // ステータスが200以外の場合は、axiosが例外をスローする
    if (axios.isAxiosError(error) && error.response) {
      const description = `Response(Inbound) -> status=${error.response.status}`;
      logger.error(logPrefix + fname + serialize(error, description));
    }
    throw error;
  }
}
