'use client';

import { actionError } from '@/modules/(system)/error-handlers/action-error';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { hasError } from '@/modules/(system)/validators/validator';
import { sendAction } from '@/modules/contact2/view-models/send-action';
import {
  Action,
  setViolations,
  State,
  toComplete,
  toInput,
} from '@/modules/contact2/view-models/steps-reducer';

/**
 * コンポーネントがレンダリングされた後に実行される処理
 */
export const applyEffect = (
  state: State,
  dispatch: React.ActionDispatch<[action: Action]>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // エラーハンドリングを追加して処理を実行する。
  withErrorHandlingAsync(() => func(), setError);

  async function func() {
    // サーバーアクション呼び出し
    const actionResult = await sendAction(state.formData);
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
