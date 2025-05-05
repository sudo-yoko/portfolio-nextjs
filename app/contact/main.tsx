'use client';

import { ErrorHandler } from '@/app/(system)/error-handler';
import {
  FormData,
  FormKey,
  FormStatus,
  validate,
} from '@/modules/contact/model';
import { sendAction } from '@/modules/contact/send-action';
import { ValidationErrors, hasError } from '@/modules/validators/validator';
import React, { useEffect, useState } from 'react';
import { withErrorHandling } from '@/modules/error-handlers/client-error-handler';

/**
 * お問い合わせフォーム クライアントコンポーネント
 */
export default function Main() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<ValidationErrors<FormKey>>({});
  const [systemError, setSystemError] = useState(false);

  /**
   * お問い合わせを送信する
   */
  async function send(formData: FormData) {
    return await withErrorHandling(() => process(), setSystemError);

    async function process() {
      setStatus('sending');

      // サーバーアクション呼び出し
      const actionResult = await sendAction(formData);

      // 正常
      if (actionResult.status === 200) {
        setErrors({});
        setStatus('complete');
        return;
      }

      if (actionResult.status === 400) {
        // バリデーションエラー
        if (actionResult.body) {
          const result = actionResult.body;
          if (hasError(result)) {
            setErrors(result);
            setStatus('idle');
            return;
          }
        }
      }
      // 上記以外は予期しないエラー
      throw new Error('予期しないエラーが発生しました。');
    }
  }

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center py-10">
        {systemError && <ErrorHandler />}
        {status === 'idle' && (
          <Form callback={send} validationErrors={errors} />
        )}
        {status === 'sending' && <Sending />}
        {status === 'complete' && <Completion />}
      </div>
    </>
  );
}

/**
 * 入力フォーム
 */
function Form({
  callback,
  validationErrors,
}: {
  callback: (formData: FormData) => void;
  validationErrors?: ValidationErrors<FormKey>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<ValidationErrors<FormKey>>({});

  useEffect(() => {
    if (validationErrors && hasError(validationErrors)) {
      setErrors(validationErrors);
    }
  }, [validationErrors]);

  /**
   * Submitイベントを処理する関数
   */
  function handleSubmit(e: React.FormEvent, formData: FormData) {
    e.preventDefault();

    // バリデーション
    const result = validate(formData);
    // エラーあり
    if (hasError(result)) {
      setErrors(result);
      return;
    }
    // エラーなし
    callback(formData);
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
            {errors.name?.map((err, index) => (
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
            {errors.email?.map((err, index) => (
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
            {errors.body?.map((err, index) => (
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

/**
 * 送信中表示コンポーネント
 */
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

/**
 * 送信完了表示コンポーネント
 */
function Completion() {
  return (
    <>
      <div>お問い合わせありがとうございました。</div>
    </>
  );
}
