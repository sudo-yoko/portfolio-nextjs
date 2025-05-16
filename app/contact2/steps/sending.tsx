import {
  Action,
  setViolations,
  State,
  toComplete,
  toInput,
} from '@/modules/contact2/model';
import { sendAction } from '@/modules/contact2/send-action';
import { withErrorHandlingAsync } from '@/modules/error-handlers/client-error-handler';
import { hasError } from '@/modules/validators/validator';
import React, { useEffect } from 'react';

/**
 * 送信中表示コンポーネント
 */
export default function Sending({
  state,
  dispatch,
  setError,
}: {
  state: State;
  dispatch: React.ActionDispatch<[action: Action]>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
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
  }, [dispatch, setError, state.formData]);

  return (
    <div>
      <div className="inset-0 z-50 flex flex-col items-center justify-center bg-white/50">
        <div className="size-16 animate-spin rounded-full border-t-4 border-solid border-t-gray-300"></div>
        <p className="mt-4 animate-pulse text-lg text-gray-700">
          送信中です。しばらくお待ちください・・・
        </p>
      </div>
    </div>
  );
}
