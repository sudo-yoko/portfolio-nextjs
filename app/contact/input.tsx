'use client';

import { FormData, FormKey, validate } from '@/modules/contact/model';
import { resizeTextarea } from '@/modules/utils/domUtils';
import { hasError, Violations } from '@/modules/validators/validator';
import { useEffect, useState } from 'react';

export default function Input({
  formData,
  violations,
  onChange,
  onNext,
}: {
  formData: FormData;
  violations?: Violations<FormKey>;
  onChange: (formData: FormData) => void;
  onNext: () => void;
}) {
  const [fieldErrors, setFieldErrors] = useState<Violations<FormKey>>({});

  useEffect(() => {
    if (violations && hasError(violations)) {
      setFieldErrors(violations);
    }
  }, [violations]);

  function handleNext() {
    // バリデーション
    ((violations: Violations<FormKey>) => {
      if (hasError(violations)) {
        setFieldErrors(violations);
        return;
      }
      onNext();
    })(validate(formData));
  }

  return (
    <>
      <div>
        <div>お問い合わせフォーム</div>
      </div>
      <div>
        <div>
          <div>お名前：</div>
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              className="w-80 border-2 border-black"
            />
          </div>
          {fieldErrors.name?.map((err, index) => (
            <div key={index}>
              <p className="text-red-500">{err}</p>
            </div>
          ))}
        </div>
        <div>
          <div>メールアドレス：</div>
          <div>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => onChange({ ...formData, email: e.target.value })}
              className="w-80 border-2 border-black"
            />
          </div>
          {fieldErrors.email?.map((err, index) => (
            <div key={index}>
              <p className="text-red-500">{err}</p>
            </div>
          ))}
        </div>
        <div>
          <div>お問い合わせ内容：</div>
          <div>
            <textarea
              value={formData.body}
              onChange={(e) => onChange({ ...formData, body: e.target.value })}
              onInput={(e) => resizeTextarea(e.currentTarget)}
              className="w-80 border-2 border-black"
            />
          </div>
          {fieldErrors.body?.map((err, index) => (
            <div key={index}>
              <p className="text-red-500">{err}</p>
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-indigo-300 px-4 py-2"
          >
            次へ
          </button>
        </div>
      </div>
    </>
  );
}
