//
// お問い合わせの送信 ユースケース
//
import logger from '@/presentation/(system)/logging-facade/logger';
import type { Ok, Rejected } from '@/presentation/(system)/types/boundary-result';
import { ok, reject, REJECTION_LABELS } from '@/presentation/(system)/types/boundary-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { hasError, Violations } from '@/presentation/(system)/validators/validator';
import { send } from '@/presentation/contact/mvvm/bff/contact2-client';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact2-types';
import { validate } from '@/presentation/contact/mvvm/models/contact2-validator';
import 'server-only';

const logPrefix = 'usecase.ts: ';

/**
 * ユースケースの実行
 */
export async function execute(formData: FormData<FormKeys>): Promise<Ok | Rejected<Violations<FormKeys>>> {
  logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
  //
  // バリデーション
  //
  const result = validate(formData);
  if (hasError(result)) {
    logger.info(logPrefix + `validation error. ${JSON.stringify(result)}`);
    return reject(REJECTION_LABELS.VIOLATION, result);
  }
  //
  // 送信
  //
  await send({ ...formData });
  return ok();
}
