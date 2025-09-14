//
// Route Handlers エラーハンドリング
//
import { isAuthError } from '@/modules/(system)/error-handlers/custom-error';
import { stringify } from '@/modules/(system)/error-handlers/error-handling-utils';
import logger from '@/modules/(system)/logging-facade/logger';
import { Aborted, RouteResult } from '@/modules/(system)/types/route-response';
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
    const { message } = stringify(e);

    const res: Aborted = RouteResult.abort(message);
    let status: number;
    if (isAuthError(e)) {
      status = 401;
    } else {
      status = 500;
    }
    logger.error(
      logPrefix +
        fname +
        `Error -> message=${message}, Response(Outbound) -> status=${status}, body=${JSON.stringify(res)}`,
    );
    return new Response(JSON.stringify(res), { status });
  }
}
