//
// お問い合わせの送信 バックエンド・ファサード
//
// バックエンド呼び出し処理の詳細を隠蔽し、UI向けにシンプルな呼び出し窓口を提供するレイヤー。
// クライアント→BFF→バックエンドAPIといった複数レイヤーにまたがるリクエストをファサードの背面に隠し、UIには呼び出し関数のみを提供する。
//
import { CONTENT_TYPE_APPLICATION_JSON_UTF8, POST } from '@/presentation/(system)/clients/constants';
import { boundaryError } from '@/presentation/(system)/error-handlers/custom-error';
import debug from '@/presentation/(system)/loggers/logger-debug';
import {
  Completed,
  isAbort,
  isOk,
  isReject,
  ok,
  parseBoundaryResult,
  reject,
  REJECTION_LABELS,
} from '@/presentation/(system)/types/boundary-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { hasError, isViolations, Violations } from '@/presentation/(system)/validators/validator';
import { action } from '@/presentation/contact/mvvm/boundary/action';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact2-types';
import 'client-only';

const logPrefix = 'facade.ts: ';

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
  const result = await action(formData);
  if (isOk(result)) {
    return ok();
  }
  if (isReject(result) && result.label === REJECTION_LABELS.VIOLATION) {
    return reject(result.label, result.data);
  }
  if (isAbort(result)) {
    throw boundaryError(result.cause);
  }
  throw boundaryError(JSON.stringify(result));
};

/**
 * Route Handlers による実装
 */
const viaRoute: SendRequest = async (formData) => {
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

  if (res.status === 200) {
    const clone = res.clone();
    const text = await clone.text();
    debug(text);
    const parsed = parseBoundaryResult<void, Violations<FormKeys>>(text);
    if (parsed !== null) {
      // 正常（バリデーションエラーなし）
      if (isOk(parsed)) {
        return ok();
      }
      // バリデーションエラー
      if (isReject(parsed) && parsed.label === REJECTION_LABELS.VIOLATION) {
        const violations = parsed.data;
        if (hasError(violations)) {
          return reject(parsed.label, violations);
        }
      }
      // 失敗
      if (isAbort(parsed)) {
        throw boundaryError(JSON.stringify(parsed));
      }
    }
  }
  // バリデーションエラー
  if (res.status === 400) {
    const clone = res.clone();
    const text = await clone.text();
    debug(text);
    const parsed = parseBoundaryResult<void, Violations<FormKeys>>(text);
    if (parsed !== null) {
      if (isReject(parsed) && parsed.label === REJECTION_LABELS.VIOLATION) {
        const violations = parsed.data;
        if (hasError(violations)) {
          return reject(parsed.label, violations);
        }
      }
    }

    if (isViolations(text)) {
      // const violations: Violations<FormKeys> = JSON.parse(text) as Violations<FormKeys>;
      // TODO: ボディがJSONパースできればviolationsでなくてもバリデーションエラーと判定されてしまうのはやむなしか。
      // hasErrorの実装も再確認
      const violations = JSON.parse(text);
      debug(logPrefix + `violations=${JSON.stringify(violations)}`);
      if (hasError(violations)) {
        return reject('violation', violations);
      }
    }
  }
  // 上記以外
  const text = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
  throw boundaryError(text);
  // throw await routeError(res.status, { body: text, method: POST, route: url });
};

/**
 * お問い合わせを送信する
 */
export const sendRequest: SendRequest = viaRoute;
