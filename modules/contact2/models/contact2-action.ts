'use server';

import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/action-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import { FormData } from '@/modules/(system)/types/form-data';
import { ActionResult } from '@/modules/(system)/types/server-action-interface';
import { Violations, hasError } from '@/modules/(system)/validators/validator';
import { ContactBody } from '@/modules/contact2/models/contact2-types';
import { validate } from '@/modules/contact2/view-models/contact2-validator';
import { send } from '@/modules/contact2/models/contact2-client';
import { FormKeys } from '@/modules/contact2/view-models/contact2-reducer';

const logPrefix = 'contact2-action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function action(
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
        logPrefix +
          `validation error. status=${result.status}, body=${JSON.stringify(result.body)}`,
      );
      */
      const result: Violations<FormKeys> = errors;
      logger.info(logPrefix + `validation error. ${JSON.stringify(result)}`);
      return result;
    }
    // バリデーション済みの値をモデルに展開
    const model: ContactBody = { ...formData };
    // 送信
    await send(model);
    // 正常
    //return { status: 200 };
  }
}
