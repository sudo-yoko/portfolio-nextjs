'use client';

import {
  FormData,
  FormKey,
  FormStatus,
  validate,
} from '@/app/demo/contact/model';
import { sendAction } from '@/app/demo/contact/send-action';
import { ValidationErrors, hasError } from '@/modules/validators/validator';
import React, { useEffect, useState } from 'react';

export default function Main() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<ValidationErrors<FormKey>>({});

  async function submit(formData: FormData) {
    setStatus('sending');
    // 送信
    const serverErrors = await sendAction(formData);
    // エラーあり
    if (hasError(serverErrors)) {
      setErrors(serverErrors);
      setStatus('idle');
      return;
    }
    // エラーなし
    setErrors({});
    setStatus('complete');
    return;
  }

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center py-10">
        {status === 'idle' && <Form submit={submit} serverErrors={errors} />}
        {status === 'sending' && <Sending />}
        {status === 'complete' && <Completion />}
      </div>
    </>
  );
}

function Form({
  submit,
  serverErrors,
}: {
  submit: (formData: FormData) => void;
  serverErrors?: ValidationErrors<FormKey>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<ValidationErrors<FormKey>>({});

  useEffect(() => {
    if (serverErrors && hasError(serverErrors)) {
      setErrors(serverErrors);
    }
  }, [serverErrors]);

  function handleSubmit(e: React.FormEvent, formData: FormData) {
    e.preventDefault();

    // バリデーション
    const clientErrors = validate(formData);
    if (hasError(clientErrors)) {
      setErrors(clientErrors);
      return;
    }
    submit(formData);
  }

  return (
    <>
      <div>
        <div>お問い合わせフォーム</div>
      </div>
      <div>
        <form onSubmit={(e) => handleSubmit(e, { name, email, body })}>
          <div>
            <div>お名前：</div>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-80 border-2 border-black"
              />
            </div>
            {errors['name']?.map((err, index) => (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-80 border-2 border-black"
              />
            </div>
            {errors['email']?.map((err, index) => (
              <div key={index}>
                <p className="text-red-500">{err}</p>
              </div>
            ))}
          </div>
          <div>
            <div>お問い合わせ内容：</div>
            <div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-80 border-2 border-black"
              />
            </div>
            {errors['body']?.map((err, index) => (
              <div key={index}>
                <p className="text-red-500">{err}</p>
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="rounded-lg bg-indigo-300 px-4 py-2"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function Sending() {
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

function Completion() {
  return (
    <>
      <div>お問い合わせありがとうございました。</div>
    </>
  );
}
