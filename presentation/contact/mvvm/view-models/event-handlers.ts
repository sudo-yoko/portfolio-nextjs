'use client';

import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/client-error-handler';
import { isOk, isReject, REJECTION_LABELS } from '@/presentation/(system)/types/boundary-result';
import { hasError, Violations } from '@/presentation/(system)/validators/validator';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact2-types';
import { validate } from '@/presentation/contact/mvvm/models/contact2-validator';
import {
  Action,
  setViolations,
  State,
  toComplete,
  toConfirm,
  toInput,
} from '@/presentation/contact/mvvm/view-models/contact2-reducer';
import { sendRequest } from '../boundary/facade';

/**
 * バリデーションエラーが取得されている場合にUIに反映する。
 */
export const applyViolations = (
  violations: Violations<FormKeys>,
  dispatch: React.ActionDispatch<[action: Action]>,
) => {
  if (violations && hasError(violations)) {
    setViolations(dispatch, violations);
  }
};

/**
 * 次へボタンを押したときの処理
 */
export function handleNext(state: State, dispatch: React.ActionDispatch<[action: Action]>) {
  // バリデーション
  ((violations: Violations<FormKeys>) => {
    if (hasError(violations)) {
      setViolations(dispatch, violations);
      return;
    }
    toConfirm(dispatch);
  })(validate(state.formData));
}

/**
 * 送信中が表示中の処理
 */
export async function send(
  state: State,
  dispatch: React.ActionDispatch<[action: Action]>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
) {
  // エラーハンドリングを追加して処理を実行する。
  await withErrorHandlingAsync(() => func(), setError);

  async function func() {
    const result = await sendRequest(state.formData);
    // 正常
    if (isOk(result)) {
      toComplete(dispatch);
      return;
    }
    // バリデーションエラーあり
    if (isReject(result) && result.label === REJECTION_LABELS.VIOLATION) {
      const violations = result.data;
      if (hasError(violations)) {
        setViolations(dispatch, violations);
        toInput(dispatch);
        return;
      }
    }
    // 上記以外
    throw Error('予期しない例外');
  }
}
