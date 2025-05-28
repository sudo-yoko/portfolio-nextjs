'use client';

import { sendAction } from '@/modules/contact2/models/send-action';
import {
  Action,
  setViolations,
  State,
  toComplete,
  toInput,
} from '@/modules/contact2/view-models/steps';
import { withErrorHandlingAsync } from '@/modules/error-handlers/client-error-handler';
import { hasError } from '@/modules/validators/validator';

/**
 * コンポーネントがレンダリングされた後に実行される処理
 */
export const applyEffect = (
  state: State,
  dispatch: React.ActionDispatch<[action: Action]>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // エラーハンドリングを追加して処理を実行する。
  withErrorHandlingAsync(() => process(), setError);

  async function process() {
    // サーバーアクション呼び出し
    const actionResult = await sendAction(state.formData);
    // 正常
    if (actionResult.status === 200) {
      toComplete(dispatch);
      return;
    }
    // バリデーションエラー
    if (actionResult.status === 400) {
      if (actionResult.body) {
        const violations = actionResult.body;
        if (hasError(violations)) {
          setViolations(dispatch, violations);
          toInput(dispatch);
          return;
        }
      }
    }
    // 上記以外は予期しないエラー
    throw new Error('予期しないエラーが発生しました。');
  }
};
