//
// お問い合わせの送信 バックエンド・ファサード
//
// バックエンド呼び出し処理の詳細を隠蔽し、UI向けにシンプルな呼び出し窓口を提供するレイヤー。
// クライアント→BFF→バックエンドAPIといった複数レイヤーにまたがるリクエストをファサードの背面に隠し、UIには呼び出し関数のみを提供する。
//
import { CONTENT_TYPE_APPLICATION_JSON_UTF8, POST } from '@/presentation/(system)/clients/constants';
import { boundaryError } from '@/presentation/(system)/error-handlers/custom-error';
import logger from '@/presentation/(system)/logging/logger.c';
import {
  Completed,
  isOk,
  isReject,
  parseBoundaryResult,
  REJECTION_LABELS,
} from '@/presentation/(system)/types/boundary-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { Violations } from '@/presentation/(system)/validators/validator';
import { action } from '@/presentation/contact/mvvm/boundary/contact.action';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import 'client-only';

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
    return result;
  }
  if (isReject(result) && result.label === REJECTION_LABELS.VIOLATION) {
    return result;
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
    logger.debug(text);
    const parsed = parseBoundaryResult<void, Violations<FormKeys>>(text);
    if (parsed !== null) {
      if (isOk(parsed)) {
        return parsed;
      }
      if (isReject(parsed) && parsed.label === REJECTION_LABELS.VIOLATION) {
        return parsed;
      }
    }
  }
  // 上記以外
  const text = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
  throw boundaryError(text);
};

/**
 * お問い合わせを送信する
 */
export const sendRequest: SendRequest = viaRoute;
