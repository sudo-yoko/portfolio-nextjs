'use client';

import { Action, State } from '@/presentation/contact/mvvm/view-models/reducer';
import { send } from '@/presentation/contact/mvvm/view-models/event-handlers';
import React, { useEffect } from 'react';

/**
 * 送信中表示コンポーネント
 */
export default function Sending({
  state,
  dispatch,
  setError,
}: {
  state: State;
  dispatch: React.ActionDispatch<[action: Action]>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    // 書き方その１
    void (async () => {
      await send(state, dispatch, setError);
    })();

    // 書き方その２
    // async function process() {
    // await send(state, dispatch, setError);
    // }
    // void process();

    // 書き方その３
    // void send(state, dispatch, setError).then(() => {});
  }, [dispatch, setError, state, state.formData]);

  return (
    <div>
      <div className="inset-0 z-50 flex flex-col items-center justify-center bg-white/50">
        <div className="size-16 animate-spin rounded-full border-t-4 border-solid border-t-gray-300"></div>
        <p className="mt-4 animate-pulse text-lg text-gray-700">送信中です。しばらくお待ちください・・・</p>
      </div>
    </div>
  );
}
