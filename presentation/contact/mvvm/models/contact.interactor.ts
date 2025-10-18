//
// お問い合わせの送信 ユースケース
//
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/boundary-error-handler';
import logger from '@/presentation/(system)/logging/logger.s';
import type { BoundaryResult } from '@/presentation/(system)/types/boundary-result';
import { ok, reject, REJECTION_LABELS } from '@/presentation/(system)/types/boundary-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { hasError, Violations } from '@/presentation/(system)/validators/validator';
import { send } from '@/presentation/contact/mvvm/models/contact.webToCase-client';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { validate } from '@/presentation/contact/mvvm/models/contact.validator';
import 'server-only';

const logPrefix = 'usecase.ts: ';

/**
 * ユースケースの実行
 */
export async function execute(
  formData: FormData<FormKeys>,
): Promise<BoundaryResult<void, Violations<FormKeys>>> {
  return await withErrorHandlingAsync(() => func());

  async function func() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
    //
    // バリデーション
    //
    const violations = validate(formData);
    if (hasError(violations)) {
      logger.info(logPrefix + `validation error. ${JSON.stringify(violations)}`);
      return reject(REJECTION_LABELS.VIOLATION, violations);
    }
    //
    // 送信
    //
    await send({ ...formData });
    return ok();
  }
}
