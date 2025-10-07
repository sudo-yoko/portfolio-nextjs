import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import logger from '@/presentation/(system)/logging-facade/logger';
import type { BoundaryResult, Ok, Rejected } from '@/presentation/(system)/types/boundary-result';
import { abort, complete } from '@/presentation/(system)/types/boundary-result';

const logPrefix = 'boundary-error-handler.ts: ';

export async function withErrorHandlingAsync<RESULT, REASON>(
  thunk: () => Promise<Ok<RESULT> | Rejected<REASON>>,
): Promise<BoundaryResult<RESULT, REASON>> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    const result = await thunk();
    return complete(result);
  } catch (e) {
    const { message } = stringify(e);
    const aborted = abort(message);
    logger.error(logPrefix + fname + `BoundaryResult=${JSON.stringify(aborted)}`);
    return aborted;
  }
}
