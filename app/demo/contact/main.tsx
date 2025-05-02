'use client';

import React, { useState } from 'react';
import { info } from '@/modules/loggers/remote-logger';
import { required } from '@/modules/validators/validator';
import { ValidationErrors } from '@/modules/validators/validator';

// フォームデータ
interface FormData {
  name: string;
  email: string;
  body: string;
}

export default function Main() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'complete'>('idle');

  async function send(formData: FormData) {
    info(
      `name=${formData.name}, email=${formData.email}, body=${formData.body}`,
    );

    setStatus('sending');

    // 2秒待機
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    setStatus('complete');
  }

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center py-10">
        {status === 'idle' && <Form callback={send} />}
        {status === 'sending' && <Sending />}
        {status === 'complete' && <Completion />}
      </div>
    </>
  );
}

function Form({ callback }: { callback: (formData: FormData) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  function handleSubmit(e: React.FormEvent, formData: FormData) {
    e.preventDefault();
    if (validate(formData)) {
      callback(formData);
    }
    return;
  }

  function validate(formData: FormData): boolean {
    const errors: ValidationErrors = {};
    errors['name'] = required('お名前', formData.name);
    errors['email'] = required('メールアドレス', formData.email);
    errors['body'] = required('お問い合わせ内容', formData.body);
    setErrors(errors);
    return Object.values(errors).every((arr) => arr.length === 0);
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
