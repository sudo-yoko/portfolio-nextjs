'use server';

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
  return await withErrorHandlingAsync(() => process());

  async function process() {
    logger.info(
      logPrefix + `request(Inbound) -> formData=${JSON.stringify(formData)}`,
    );

    // バリデーション
    const errors = validate(formData);
    if (hasError(errors)) {
      const result: ActionResult<ValidationErrors<FormKey>> = {
        status: 400,
        body: errors,
      };
      logger.info(
        logPrefix +
          `response(Outbound) -> validation error. status=${result.status}, body=${JSON.stringify(errors)}`,
      );
      return result;
    }

    // フォームデータ
    const body = new URLSearchParams(formData);
    logger.info(logPrefix + `request(Outbound) -> formData=${body.toString()}`);

    // SalesforceのWeb-to-CaseにPOST
    const res = await fetch('http://localhost:3001/servlet/servlet.WebToCase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    // 正常
    if (res.status === 200) {
      logger.info(logPrefix + `response(Inbound) -> status=${res.status}`);
      return { status: res.status };
    }

    // エラー
    logger.error(logPrefix + `response(Inbound) -> status=${res.status}`);
    return { status: res.status };
  }
}
