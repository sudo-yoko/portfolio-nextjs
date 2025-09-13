//
// Route Handlers エラーハンドリング
//
import { isAuthError } from '@/modules/(system)/error-handlers/custom-error';
import { serialize } from '@/modules/(system)/error-handlers/error-handling-utils';
import logger from '@/modules/(system)/logging-facade/logger';
import 'server-only';

const logPrefix = 'route-error-handler.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync(thunk: () => Promise<Response>): Promise<Response> {
  const fname = 'withErrorHandlingAsync: ';

  try {
    return await thunk();
  } catch (e) {
    logger.error(logPrefix + fname + serialize(e));
    if (isAuthError(e)) {
      return new Response(null, { status: 401 });
    }
    return new Response(null, { status: 500 });
  }
}
