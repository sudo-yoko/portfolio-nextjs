'use server';

import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/boundary-error-hander';
import logger from '@/presentation/(system)/logging-facade/logger';
import { BoundaryResult, ok, reject, REJECTION_LABELS } from '@/presentation/(system)/types/boundary-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { Violations } from '@/presentation/(system)/validators/validator';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact2-types';
import { execute } from '@/presentation/contact/mvvm/models/usecase';

const logPrefix = '/contact/action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function action(
  formData: FormData<FormKeys>,
): Promise<BoundaryResult<void, Violations<FormKeys>>> {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => func());

  async function func() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
    const result = await execute(formData);
    if (result.tag === 'ok') {
      return ok();
    }
    if (result.tag === 'reject' && result.label === REJECTION_LABELS.VIOLATION) {
      return reject(result.label, result.data);
    }
    // TODO: 到達可能か
    throw Error();
  }
}
