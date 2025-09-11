'use client';

import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { actionError } from '@/modules/(system)/error-handlers/custom-error';
import { hasError } from '@/modules/(system)/validators/validator';
import { action } from '@/modules/contact2/models/contact2-action';
import {
  Action,
  setViolations,
  State,
  toComplete,
  toInput,
} from '@/modules/contact2/view-models/contact2-reducer';

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
      throw actionError();
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
