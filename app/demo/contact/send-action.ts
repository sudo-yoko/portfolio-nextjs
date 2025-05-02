'use server';

import { FormData, validate } from '@/app/demo/contact/model';
import logger from '@/modules/loggers/logger';
import { ValidationErrors } from '@/modules/validators/validator';

const logPrefix = 'send-action.ts: ';

export async function sendAction(
  formData: FormData,
): Promise<ValidationErrors> {
  logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);

  const errors = validate(formData);

  // 2秒待機
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  return errors;
}
