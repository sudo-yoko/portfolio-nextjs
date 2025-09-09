'use client';

import { Action, State, toInput, toSending } from '@/modules/contact2/view-models/contact2-reducer';

/**
 * 確認表示コンポーネント
 */
export default function Confirm({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.ActionDispatch<[action: Action]>;
}) {
  return (
    <>
      <div>
        <div>この内容で送信しますか？</div>
      </div>
      <div>
        <div className="py-10">
          <div>お名前：{state.formData.name}</div>
          <div>メールアドレス：{state.formData.email}</div>
          <div>お問い合わせ内容：</div>
          <div className="whitespace-pre-line">{state.formData.body}</div>
        </div>
        <div className="space-x-4">
          <button
            type="button"
            onClick={() => toInput(dispatch)}
            className="rounded-lg bg-indigo-300 px-4 py-2"
          >
            修正する
          </button>
          <button
            type="button"
            onClick={() => toSending(dispatch)}
            className="rounded-lg bg-indigo-300 px-4 py-2"
          >
            送信する
          </button>
        </div>
      </div>
    </>
  );
}
