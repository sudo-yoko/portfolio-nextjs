'use server';

import { FormData, FormKey, validate } from '@/modules/contact/model';
import logger from '@/modules/loggers/logger';
import { ValidationErrors, hasError } from '@/modules/validators/validator';

const logPrefix = 'send-action.ts: ';

export async function sendAction(
  formData: FormData,
): Promise<ValidationErrors<FormKey>> {
  // バリデーション
  const errors = validate(formData);
  if (hasError(errors)) {
    return errors;
  }

  const body = new URLSearchParams(formData);
  logger.info(logPrefix + `Outbound request -> formData=${body.toString()}`);

  // SalesforceのWeb-to-CaseにPOST
  const res = await fetch('http://localhost:3001/servlet/servlet.WebToCase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  // レスポンス
  logger.info(logPrefix + `Inbound response -> status=${res.status}`);
  if (res.status === 200) {
    return {};
  }
  throw new Error(`response status=${res.status}`);
}
