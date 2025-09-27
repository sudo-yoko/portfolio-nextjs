'use client';

import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/client-error-handler';
import { actionError } from '@/presentation/(system)/error-handlers/custom-error';
import { hasError } from '@/presentation/(system)/validators/validator';
import { action } from '@/presentation/contact/mvvm/bff/contact2-action';
import {
  Action,
  setViolations,
  State,
  toComplete,
  toInput,
} from '@/presentation/contact/mvvm/view-models/contact2-reducer';

/**
 * コンポーネントがレンダリングされた後に実行される処理
 */
export const send = (
  state: State,
  dispatch: React.ActionDispatch<[action: Action]>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // エラーハンドリングを追加して処理を実行する。
  withErrorHandlingAsync(() => func(), setError);

  async function func() {
    // サーバーアクション呼び出し
    const actionResult = await action(state.formData);
    if (actionResult.abort) {
      throw actionError(actionResult);
    }
    // バリデーションエラーあり
    if (actionResult.data) {
      const violations = actionResult.data;
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
};
