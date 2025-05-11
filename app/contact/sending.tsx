import { FormData, FormKey } from '@/modules/contact/model';
import { sendAction } from '@/modules/contact/send-action';
import { withErrorHandlingAsync } from '@/modules/error-handlers/client-error-handler';
import { hasError, Violations } from '@/modules/validators/validator';
import React, { useEffect } from 'react';

export default function Sending({
  formData,
  setViolations,
  setStepInput,
  setStepComplete,
  setSystemError,
}: {
  formData: FormData;
  setViolations: React.Dispatch<React.SetStateAction<Violations<FormKey>>>;
  setStepInput: () => void;
  setStepComplete: () => void;
  setSystemError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    // エラーハンドリングを追加して処理を実行する。
    withErrorHandlingAsync(() => process(), setSystemError);

    async function process() {
      // サーバーアクション呼び出し
      const actionResult = await sendAction(formData);

      // 正常
      if (actionResult.status === 200) {
        setViolations({});
        setStepComplete();
        return;
      }

      if (actionResult.status === 400) {
        // バリデーションエラー
        if (actionResult.body) {
          const result = actionResult.body;
          if (hasError(result)) {
            setViolations(result);
            setStepInput();
            return;
          }
        }
      }
      // 上記以外は予期しないエラー
      throw new Error('予期しないエラーが発生しました。');
    }
  });

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
