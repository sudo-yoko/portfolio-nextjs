//
// Route Handlers エラーハンドリング
//
import 'server-only';

import { isAuthError } from '@/presentation/(system)/error-handlers/custom-error';
import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import logger from '@/presentation/(system)/logging/logger.s';
import { Aborted, RouteResult } from '@/presentation/(system)/types/route-response';

const logPrefix = 'route-error-handler.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync(thunk: () => Promise<Response>): Promise<Response> {
  const fname = 'withErrorHandlingAsync: ';

  try {
    return await thunk();
  } catch (e) {
    const { message } = stringify(e);

    const res: Aborted = RouteResult.abort(message);
    let status: number;
    if (isAuthError(e)) {
      status = 401;
    } else {
      status = 500;
    }
    logger.error(logPrefix + fname + `Response(Outbound) -> status=${status}, body=${JSON.stringify(res)}`);
    return new Response(JSON.stringify(res), { status });
  }
}
