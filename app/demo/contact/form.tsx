'use client';

export default function Form() {
  return (
    <>
      <div>
        <div>お問い合わせフォーム</div>
      </div>
      <div>
        <div>お名前：</div>
        <div>
          <input type="text" className="w-60 border-2 border-black" />
        </div>
      </div>
      <div>
        <div>メールアドレス：</div>
        <div>
          <input type="text" className="w-60 border-2 border-black" />
        </div>
      </div>
      <div>
        <div>お問い合わせ内容：</div>
        <div>
          <textarea className="w-1/3 border-2 border-black" />
        </div>
      </div>
    </>
  );
}
