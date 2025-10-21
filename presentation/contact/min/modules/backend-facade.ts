//
// お問い合わせの送信 バックエンド・ファサード
//
// バックエンド呼び出し処理の詳細を隠蔽し、UI向けにシンプルな呼び出し窓口を提供するレイヤー。
// クライアント→BFF→バックエンドAPIといった複数レイヤーにまたがるリクエストをファサードの背面に隠し、UIには呼び出し関数のみを提供する。
//
import { CONTENT_TYPE_APPLICATION_JSON_UTF8, POST } from '@/presentation/(system)/clients/constants';
import { actionError, routeError } from '@/presentation/(system)/error-handlers/custom-error';
import logger from '@/presentation/(system)/logging/logger.c';
import { Completed, ok, reject, REJECTION_LABELS } from '@/presentation/(system)/types/boundary-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { hasError, isViolations } from '@/presentation/(system)/validation/validation.helper';
import { Violations } from '@/presentation/(system)/validation/validation.types';
import { sendAction } from '@/presentation/contact/min/modules/contact-action';
import { FormKeys } from '@/presentation/contact/min/modules/contact-types';
import 'client-only';

const logPrefix = 'backend-facade.ts: ';

/**
 *
 */
type SendRequest = {
  (formData: FormData<FormKeys>): Promise<Completed<void, Violations<FormKeys>>>;
};

/**
 * Server Actions による実装
 */
const _viaAction: SendRequest = async (formData) => {
  // Server Action を呼び出す
  const result = await sendAction(formData);
  if (result.abort) {
    throw actionError(result);
  }
  // バリデーションエラー
  if (result.data && hasError(result.data)) {
    return reject(REJECTION_LABELS.VIOLATION, result.data);
  }
  return ok();
};

/**
 * Route Handlers による実装
 */
const viaRoute: SendRequest = async (formData) => {
  // Route Handler を呼び出す
  const url = '/api/contact/min';
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
    return { tag: 'ok' };
  }
  // バリデーションエラー
  if (res.status === 400) {
    const clone = res.clone();
    const text = await clone.text();
    logger.debug(text);
    if (isViolations(text)) {
      // const violations: Violations<FormKeys> = JSON.parse(text) as Violations<FormKeys>;
      // TODO: ボディがJSONパースできればviolationsでなくてもバリデーションエラーと判定されてしまうのはやむなしか。
      // hasErrorの実装も再確認
      const violations = JSON.parse(text);
      logger.debug(logPrefix + `violations=${JSON.stringify(violations)}`);
      if (hasError(violations)) {
        //throw validationError(violations);
        // return { tag: 'reject', kind: 'violation', data: violations };
        return reject(REJECTION_LABELS.VIOLATION, violations);
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
export const sendRequest: SendRequest = viaRoute;
