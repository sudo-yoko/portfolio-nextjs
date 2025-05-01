'use client';

import React, { useState } from 'react';

export default function Main() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sent');
  }

  return (
    <>
      {status === 'idle' && <Form />}
      {status === 'sent' && <Completion />}
    </>
  );

  function Form() {
    return (
      <>
        <div>
          <div>お問い合わせフォーム</div>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <div>
            <div>お名前：</div>
            <div>
              <input
                type="text"
                //value={name}
                //onChange={(e) => setName(e.target.value)}
                className="w-60 border-2 border-black"
              />
            </div>
          </div>
          <div>
            <div>メールアドレス：</div>
            <div>
              <input
                type="text"
                //value={email}
                //onChange={(e) => setEmail(e.target.value)}
                className="w-60 border-2 border-black"
              />
            </div>
          </div>
          <div>
            <div>お問い合わせ内容：</div>
            <div>
              <textarea
                //value={body}
                //onChange={(e) => setBody(e.target.value)}
                className="w-1/3 border-2 border-black"
              />
            </div>
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
      </>
    );
  }

  function Completion() {
    return (
      <>
        <div>お問い合わせありがとうございました。</div>
      </>
    );
  }
}
