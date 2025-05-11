'use client';

import { FormData } from '@/modules/contact/model';

export default function Confirm({
  formData,
  setStepInput,
  setStepSending,
}: {
  formData: FormData;
  setStepInput: () => void;
  setStepSending: () => void;
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
          <div>お問い合わせ内容：{formData.body}</div>
        </div>
        <div className="space-x-4">
          <button
            type="button"
            onClick={setStepInput}
            className="rounded-lg bg-indigo-300 px-4 py-2"
          >
            修正する
          </button>
          <button
            type="button"
            onClick={setStepSending}
            className="rounded-lg bg-indigo-300 px-4 py-2"
          >
            送信する
          </button>
        </div>
      </div>
    </>
  );
}
