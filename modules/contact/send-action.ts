'use server';

import { send } from '@/modules/clients/web-to-case-client';
import { FormData, FormKey, validate } from '@/modules/contact/model';
import { withErrorHandlingAsync } from '@/modules/error-handlers/action-error-handler';
import logger from '@/modules/logging-facade/logger';
import { ActionResult } from '@/modules/types/action-result';
import { ValidationErrors, hasError } from '@/modules/validators/validator';

const logPrefix = 'send-action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function sendAction(
  formData: FormData,
): Promise<ActionResult<ValidationErrors<FormKey> | void>> {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => process());

  async function process() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);

    // バリデーション
    const errors = validate(formData);
    if (hasError(errors)) {
      const result: ActionResult<ValidationErrors<FormKey>> = {
        status: 400,
        body: errors,
      };
      logger.info(
        logPrefix +
          `validation error. status=${result.status}, body=${JSON.stringify(result.body)}`,
      );
      return result;
    }

    // 送信
    await send(formData);
    // 正常
    return { status: 200 };
  }
}
