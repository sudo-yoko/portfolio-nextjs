import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/client-error-handler';
import { isOk, isReject, REJECTION_LABELS } from '@/presentation/(system)/types/boundary-result';
import { FormData } from '@/presentation/(system)/types/form-data';
import { hasError, Violations } from '@/presentation/(system)/validators/validator';
import { sendRequest } from '@/presentation/contact/min/modules/backend-facade';
import { FormKeys } from '@/presentation/contact/min/modules/contact-types';
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
    void (async () => {
      await withErrorHandlingAsync(() => func(), setError);
    })();

    async function func() {
      const result = await sendRequest(formData);
      // 正常
      if (isOk(result)) {
        setViolations({});
        onNext();
        return;
      }
      // バリデーションエラーあり
      if (isReject(result) && result.label === REJECTION_LABELS.VIOLATION) {
        if (hasError(result.data)) {
          setViolations(result.data);
          onBack();
          return;
        }
      }
      throw Error('予期しない例外');
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
