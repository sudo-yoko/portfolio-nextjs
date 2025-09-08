import { serialize } from '@/modules/(system)/error-handlers/error-handling-utils';
import logger from '@/modules/(system)/logging-facade/logger';
import axios from 'axios';
import 'server-only';

const logPrefix = 'server-error-handler.ts: ';

/**
 * サーバーサイドエラーハンドリング
 */
export function withErrorHandling<T>(thunk: () => T): T {
  const fname = 'withErrorHandling: ';

  try {
    // 引数に渡されたサンクを実行
    return thunk();
  } catch (error) {
    handleError(error, fname);
    // 再スローすることで、Next.jsが未処理の例外としてキャッチしerror.tsxをレンダリングする。
    throw error;
  }
}

/**
 * サーバーサイドエラーハンドリング（非同期処理用）
 */
export async function withErrorHandlingAsync<T>(thunk: () => Promise<T>): Promise<T> {
  const fname = 'withErrorHandlingAsync: ';

  try {
    // 引数に渡されたサンクを実行
    return await thunk();
  } catch (error) {
    handleError(error, fname);
    throw error;
  }
}

export function handleError(error: unknown, fname: string): void {
  // axiosのエラーの場合
  // ステータスが200以外の場合は、axiosが例外をスローする
  if (axios.isAxiosError(error) && error.response) {
    const description = `Response(Inbound) -> status=${error.response.status}, data=${error.response.data}`;
    logger.error(logPrefix + fname + serialize(error, description));
    return;
  }

  // 上記以外のエラーの場合
  logger.error(logPrefix + fname + serialize(error));
}
