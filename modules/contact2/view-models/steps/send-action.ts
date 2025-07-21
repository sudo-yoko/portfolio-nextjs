'use server';

import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/action-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import { ActionResult } from '@/modules/(system)/types/action-result';
import { Violations, hasError } from '@/modules/(system)/validators/validator';
import { ContactModel } from '@/modules/contact2/models/contact-model';
import { send } from '@/modules/contact2/models/web-to-case-client';
import {
  FormData,
  FormKey,
} from '@/modules/contact2/view-models/steps-reducer';
import { validate } from '@/modules/contact2/view-models/validator';

const logPrefix = 'send-action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function sendAction(
  formData: FormData,
): Promise<ActionResult<Violations<FormKey> | void>> {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => process());

  async function process() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);

    // バリデーション
    const errors = validate(formData);
    if (hasError(errors)) {
      const result: ActionResult<Violations<FormKey>> = {
        status: 400,
        body: errors,
      };
      logger.info(
        logPrefix +
          `validation error. status=${result.status}, body=${JSON.stringify(result.body)}`,
      );
      return result;
    }
    // バリデーション済みの値をモデルに展開
    const model: ContactModel = { ...formData };
    // 送信
    await send(model);
    // 正常
    return { status: 200 };
  }
}
