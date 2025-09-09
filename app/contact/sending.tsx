import { actionError } from '@/modules/(system)/error-handlers/action-error';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { FormData } from '@/modules/(system)/types/form-data';
import { hasError, Violations } from '@/modules/(system)/validators/validator';
import { sendAction } from '@/modules/contact/models/contact-action';
import { FormKeys } from '@/modules/contact/models/contact-types';
import React, { useEffect } from 'react';

export default function Sending({
  formData,
  setViolations,
  onBack,
  onNext,
  setError,
}: {
  formData: FormData<FormKeys>;
  setViolations: React.Dispatch<React.SetStateAction<Violations<FormKeys>>>;
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
