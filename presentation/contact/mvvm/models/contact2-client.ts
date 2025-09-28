//
// お問い合わせの送信 BFFクライアント
//
import { CONTENT_TYPE_APPLICATION_JSON_UTF8, POST } from '@/presentation/(system)/clients/constants';
import {
  actionError,
  routeError,
  validationError,
} from '@/presentation/(system)/error-handlers/custom-error';
import logger from '@/presentation/(system)/logging-facade/logger';
import { FormData } from '@/presentation/(system)/types/form-data';
import { tryParseJson } from '@/presentation/(system)/utils/json-utils';
import { hasError } from '@/presentation/(system)/validators/validator';
import { action } from '@/presentation/contact/mvvm/bff/contact2-action';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact2-types';
import 'client-only';

const logPrefix = 'contact2-client.ts: ';

interface Send {
  (formData: FormData<FormKeys>): Promise<void>;
}

/**
 * BFF が Server Actions の場合のクライアント実装
 */
const _sendAction: Send = async (formData) => {
  const result = await action(formData);
  if (result.abort) {
    throw actionError(result);
  }
  if (result.data && hasError(result.data)) {
    throw validationError(result.data);
  }
};

/**
 * BFF が Route Handlers の場合のクライアント実装
 */
const sendRoute: Send = async (formData) => {
  const url = '/api/contact/mvvm';
  const { name, email, body } = formData;
  const res = await fetch(url, {
    method: POST,
    headers: {
      ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
    },
    body: JSON.stringify({ name, email, body }),
  });
  // 正常（バリデーションエラーなし）
  if (res.status === 200) {
    return;
  }
  // バリデーションエラー
  if (res.status === 400) {
    const clone = res.clone();
    const text = await clone.text();
    if (text && tryParseJson(text)) {
      // const violations: Violations<FormKeys> = JSON.parse(text) as Violations<FormKeys>;
      // ボディがJSONパースできればviolationsでなくてもバリデーションエラーと判定されてしまうのはやむなしか。
      // hasErrorの実装も再確認
      const anyJson = JSON.parse(text);
      logger.info(logPrefix + `violations=${JSON.stringify(anyJson)}`);
      if (hasError(anyJson)) {
        throw validationError(anyJson);
      }
    }
  }
  // 上記以外
  const text = await res.text();
  throw await routeError(res.status, { body: text, method: POST, route: url });
};

export const send: Send = sendRoute;
