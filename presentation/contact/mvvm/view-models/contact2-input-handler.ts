'use client';

import { hasError, Violations } from '@/presentation/(system)/validators/validator';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact2-types';
import { Action, setViolations, State, toConfirm } from '@/presentation/contact/mvvm/view-models/contact2-reducer';
import { validate } from '@/presentation/contact/mvvm/models/contact2-validator';

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
