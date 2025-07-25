'use client';

import { hasError, Violations } from '@/modules/(system)/validators/validator';
import {
  Action,
  FormKey,
  setViolations,
  State,
  toConfirm,
} from '@/modules/contact2/view-models/steps-reducer';
import { validate } from '@/modules/contact2/view-models/validator';

/**
 * コンポーネントがレンダリングされた後に実行される処理
 */
export const applyEffect = (
  violations: Violations<FormKey>,
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
  ((violations: Violations<FormKey>) => {
    if (hasError(violations)) {
      setViolations(dispatch, violations);
      return;
    }
    toConfirm(dispatch);
  })(validate(state.formData));
}
