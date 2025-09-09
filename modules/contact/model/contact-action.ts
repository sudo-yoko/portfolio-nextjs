'use server';

import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/action-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import { Violations, hasError } from '@/modules/(system)/validators/validator';
import { FormKeys } from '@/modules/contact/model/contact-types';
import { send } from '@/modules/contact/model/contact-client';
import { FormData } from '../../(system)/types/form-data';
import { validate } from './contact-validator';

const logPrefix = 'send-action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function sendAction(formData: FormData<FormKeys>) {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => process());

  async function process() {
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
