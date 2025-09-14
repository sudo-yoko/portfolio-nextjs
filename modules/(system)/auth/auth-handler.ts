import { authError } from '@/modules/(system)/error-handlers/custom-error';
import { stringify } from '@/modules/(system)/error-handlers/error-handling-utils';
import logger from '@/modules/(system)/logging-facade/logger';
import 'server-only';

const logPrefix = 'auth-handler.ts: ';

/**
 * 引数に渡されたサンクに認証処理を追加して実行する
 */
export async function withAuthAsync<T>(thunk: () => Promise<T>): Promise<T> {
  const fname = 'withAuthAsync: ';
  try {
    if (process.env['AUTH_ERROR']) {
      throw authError();
    }
    return await thunk();
  } catch (e) {
    logger.error(logPrefix + fname + stringify(e).all);
    throw e;
  }
}
