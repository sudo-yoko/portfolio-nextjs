import 'server-only';

import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import logger from '@/presentation/(system)/logging-facade/logger';
import type { BoundaryResult } from '@/presentation/(system)/types/boundary-result';
import { abort } from '@/presentation/(system)/types/boundary-result';

const logPrefix = 'boundary-error-handler.ts: ';

/**
 * クライアント／サーバー境界 エラーハンドリング.
 *
 * @remarks 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync<RESULT, REASON>(
  thunk: () => Promise<BoundaryResult<RESULT, REASON>>,
): Promise<BoundaryResult<RESULT, REASON>> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (e) {
    const { message, all } = stringify(e);
    logger.error(logPrefix + fname + all);
    return abort(message);
  }
}
