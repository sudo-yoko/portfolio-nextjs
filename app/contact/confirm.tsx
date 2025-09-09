'use client';

import { FormData } from '@/modules/(system)/types/form-data';
import { FormKeys } from '@/modules/contact/models/contact-types';

export default function Confirm({
  formData,
  onBack,
  onNext,
}: {
  formData: FormData<FormKeys>;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <div>
        <div>この内容で送信しますか？</div>
      </div>
      <div>
        <div className="py-10">
          <div>お名前：{formData.name}</div>
          <div>メールアドレス：{formData.email}</div>
          <div>お問い合わせ内容：</div>
          <div className="whitespace-pre-line">{formData.body}</div>
        </div>
        <div className="space-x-4">
          <button type="button" onClick={onBack} className="rounded-lg bg-indigo-300 px-4 py-2">
            修正する
          </button>
          <button type="button" onClick={onNext} className="rounded-lg bg-indigo-300 px-4 py-2">
            送信する
          </button>
        </div>
      </div>
    </>
  );
}
