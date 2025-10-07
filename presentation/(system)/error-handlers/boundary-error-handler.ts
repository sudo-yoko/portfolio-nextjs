import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import logger from '@/presentation/(system)/logging-facade/logger';
import type { BoundaryResult } from '@/presentation/(system)/types/boundary-result';
import { abort } from '@/presentation/(system)/types/boundary-result';
import 'server-only';

const logPrefix = 'boundary-error-handler.ts: ';

export async function withErrorHandlingAsync<RESULT, REASON>(
  thunk: () => Promise<BoundaryResult<RESULT, REASON>>,
): Promise<BoundaryResult<RESULT, REASON>> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (e) {
    const { message } = stringify(e);
    const aborted = abort(message);
    logger.error(logPrefix + fname + `BoundaryResult=${JSON.stringify(aborted)}`);
    return aborted;
  }
}
