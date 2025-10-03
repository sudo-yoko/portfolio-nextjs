'use client';

import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/client-error-handler';
import { hasError, Violations } from '@/presentation/(system)/validators/validator';
import { sendRequest } from '@/presentation/contact/mvvm/models/backend-facade';
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
    // バリデーションエラーあり
    if (result.tag === 'reject' && result.kind === 'violation') {
      const violations = result.data;
      if (hasError(violations)) {
        setViolations(dispatch, violations);
        toInput(dispatch);
        return;
      }
    }
    // 正常
    toComplete(dispatch);
    return;
  }
}
