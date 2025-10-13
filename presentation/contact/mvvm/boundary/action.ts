'use server';

import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/boundary-error-handler';
import logger from '@/presentation/(system)/logging-facade/logger';
import { BoundaryResult } from '@/presentation/(system)/types/boundary-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { Violations } from '@/presentation/(system)/validators/validator';
import { FormKeys } from '@/presentation/contact/mvvm/models/types';
import { execute } from '@/presentation/contact/mvvm/models/interactor';

const logPrefix = '/contact/action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function action(
  formData: FormData<FormKeys>,
): Promise<BoundaryResult<void, Violations<FormKeys>>> {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
    return await execute(formData);
  }
}
