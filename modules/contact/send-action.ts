'use server';

import { FormData, FormKey, validate } from '@/modules/contact/model';
import { send } from '@/modules/contact/web-to-case-client';
import { withErrorHandlingAsync } from '@/modules/error-handlers/action-error-handler';
import logger from '@/modules/logging-facade/logger';
import { ActionResult } from '@/modules/types/action-result';
import { Violations, hasError } from '@/modules/validators/validator';

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

    // 送信
    await send(formData);
    // 正常
    return { status: 200 };
  }
}
