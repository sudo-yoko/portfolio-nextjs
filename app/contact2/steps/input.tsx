'use client';

import { Action, setValue, State } from '@/modules/contact2/view-models/steps';
import {
  applyEffect,
  handleNext,
} from '@/modules/contact2/view-models/steps/input';
import { resizeTextarea } from '@/modules/utils/domUtils';
import { useEffect } from 'react';

/**
 * 入力フォームコンポーネント
 */
export default function Input({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.ActionDispatch<[action: Action]>;
}) {
  useEffect(() => {
    applyEffect(state.violations, dispatch);
  }, [dispatch, state.violations]);

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
              value={state.formData.name}
              onChange={(e) => setValue(dispatch, 'name', e.target.value)}
              className="w-80 border-2 border-black"
            />
          </div>
          {state.violations.name?.map((err, index) => (
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
              value={state.formData.email}
              onChange={(e) => setValue(dispatch, 'email', e.target.value)}
              className="w-80 border-2 border-black"
            />
          </div>
          {state.violations.email?.map((err, index) => (
            <div key={index}>
              <p className="text-red-500">{err}</p>
            </div>
          ))}
        </div>
        <div>
          <div>お問い合わせ内容：</div>
          <div>
            <textarea
              value={state.formData.body}
              onChange={(e) => setValue(dispatch, 'body', e.target.value)}
              onInput={(e) => resizeTextarea(e.currentTarget)}
              className="w-80 border-2 border-black"
            />
          </div>
          {state.violations.body?.map((err, index) => (
            <div key={index}>
              <p className="text-red-500">{err}</p>
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={() => handleNext(state, dispatch)}
            className="rounded-lg bg-indigo-300 px-4 py-2"
          >
            次へ
          </button>
        </div>
      </div>
    </>
  );
}
