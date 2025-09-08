import { actionError } from '@/modules/(system)/error-handlers/action-error';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { hasError, Violations } from '@/modules/(system)/validators/validator';
import { FormData, FormKey } from '@/modules/contact/model';
import { sendAction } from '@/modules/contact/send-action';
import React, { useEffect } from 'react';

export default function Sending({
  formData,
  setViolations,
  onBack,
  onNext,
  setError,
}: {
  formData: FormData;
  setViolations: React.Dispatch<React.SetStateAction<Violations<FormKey>>>;
  onBack: () => void;
  onNext: () => void;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    // エラーハンドリングを追加して処理を実行する。
    withErrorHandlingAsync(() => func(), setError);

    async function func() {
      // サーバーアクション呼び出し
      const actionResult = await sendAction(formData);
      if (actionResult.abort) {
        throw actionError();
      }
      // バリデーションエラーあり
      if (actionResult.data) {
        const result = actionResult.data;
        if (hasError(result)) {
          setViolations(result);
          onBack();
          return;
        }
      }
      // 正常
      setViolations({});
      onNext();
      return;
    }
  });

  return (
    <div>
      <div className="inset-0 z-50 flex flex-col items-center justify-center bg-white/50">
        <div className="size-16 animate-spin rounded-full border-t-4 border-solid border-t-gray-300"></div>
        <p className="mt-4 animate-pulse text-lg text-gray-700">送信中です。しばらくお待ちください・・・</p>
      </div>
    </div>
  );
}
