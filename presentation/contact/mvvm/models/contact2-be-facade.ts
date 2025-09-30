//
// お問い合わせの送信 バックエンドファサード
//
import { CONTENT_TYPE_APPLICATION_JSON_UTF8, POST } from '@/presentation/(system)/clients/constants';
import {
  actionError,
  routeError,
  validationError,
} from '@/presentation/(system)/error-handlers/custom-error';
import debug from '@/presentation/(system)/loggers/logger-debug';
import { FormData } from '@/presentation/(system)/types/form-data';
import { hasError, isViolations } from '@/presentation/(system)/validators/validator';
import { action } from '@/presentation/contact/mvvm/bff/contact2-action';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact2-types';
import 'client-only';

const logPrefix = 'contact2-client.ts: ';

interface SendRequest {
  (formData: FormData<FormKeys>): Promise<void>;
}

/**
 * Server Actions を使った BFF 実装
 */
const sendAction: SendRequest = async (formData) => {
  // Server Action を呼び出す
  const result = await action(formData);
  if (result.abort) {
    throw actionError(result);
  }
  // バリデーションエラー
  if (result.data && hasError(result.data)) {
    throw validationError(result.data);
  }
};

/**
 * Route Handlers を使った BFF 実装
 */
const sendRoute: SendRequest = async (formData) => {
  // Route Handler を呼び出す
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
    debug(text);
    if (isViolations(text)) {
      // const violations: Violations<FormKeys> = JSON.parse(text) as Violations<FormKeys>;
      // TODO: ボディがJSONパースできればviolationsでなくてもバリデーションエラーと判定されてしまうのはやむなしか。
      // hasErrorの実装も再確認
      const violations = JSON.parse(text);
      debug(logPrefix + `violations=${JSON.stringify(violations)}`);
      if (hasError(violations)) {
        throw validationError(violations);
      }
    }
  }
  // 上記以外
  const text = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
  throw await routeError(res.status, { body: text, method: POST, route: url });
};

/**
 * お問い合わせを送信する
 */
export const sendRequest: SendRequest = sendAction;
