'use server';

import { FormData, FormKey, validate } from '@/modules/contact/model';
import { withErrorHandlingAsync } from '@/modules/error-handlers/action-error-handler';
import logger from '@/modules/logging-facade/logger';
import { ActionResult } from '@/modules/types/action-result';
import { ValidationErrors, hasError } from '@/modules/validators/validator';

const logPrefix = 'send-action.ts: ';

export async function sendAction(
  formData: FormData,
): Promise<ActionResult<ValidationErrors<FormKey>> | ActionResult<void>> {
  return await withErrorHandlingAsync(() => actionProcess());

  async function actionProcess() {
    // バリデーション
    const errors = validate(formData);
    if (hasError(errors)) {
      return { status: 400, body: errors };
    }

    // フォームデータ
    const body = new URLSearchParams(formData);
    logger.info(logPrefix + `Outbound request -> formData=${body.toString()}`);

    // SalesforceのWeb-to-CaseにPOST
    const res = await fetch('http://localhost:3001/servlet/servlet.WebToCase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    // 正常
    if (res.status === 200) {
      logger.info(logPrefix + `Inbound response -> status=${res.status}`);
      return { status: res.status };
    }

    // エラー
    logger.error(logPrefix + `Inbound response -> status=${res.status}`);
    return { status: res.status };
  }
}
