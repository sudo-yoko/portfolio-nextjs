'use client';

import { hasError, Violations } from '@/modules/(system)/validators/validator';
import {
  Action,
  FormKeys,
  setViolations,
  State,
  toConfirm,
} from '@/modules/contact2/view-models/steps-reducer';
import { validate } from '@/modules/contact2/models/validator';

/**
 * コンポーネントがレンダリングされた後に実行される処理
 */
export const applyEffect = (
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
export function handleNext(
  state: State,
  dispatch: React.ActionDispatch<[action: Action]>,
) {
  // バリデーション
  ((violations: Violations<FormKeys>) => {
    if (hasError(violations)) {
      setViolations(dispatch, violations);
      return;
    }
    toConfirm(dispatch);
  })(validate(state.formData));
}
