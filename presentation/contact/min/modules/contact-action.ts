// min
'use server';

import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/action-error-handler';
import logger from '@/presentation/(system)/logging-facade/logger';
import { ActionResult } from '@/presentation/(system)/types/action-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { Violations, hasError } from '@/presentation/(system)/validators/validator';
import { send } from '@/presentation/contact/min/modules/contact-client';
import { FormKeys } from '@/presentation/contact/min/modules/contact-types';
import { validate } from '@/presentation/contact/min/modules/contact-validator';

const logPrefix = 'contact-action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function sendAction(
  formData: FormData<FormKeys>,
): Promise<ActionResult<Violations<FormKeys> | void>> {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => func());

  async function func() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);

    // バリデーション
    const errors = validate(formData);
    if (hasError(errors)) {
      /*
      const result: ActionResult<Violations<FormKey>> = {
        status: 400,
        body: errors,
      };
      logger.info(
        logPrefix + `validation error. status=${result.status}, body=${JSON.stringify(result.body)}`,
      );
      */
      const result: Violations<FormKeys> = errors;
      logger.info(logPrefix + `validation error. ${JSON.stringify(result)}`);
      return result;
    }

    // 送信
    await send(formData);
    // 正常
    //return { status: 200 };
  }
}
