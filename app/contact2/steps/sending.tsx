'use client';

import { Action, State } from '@/modules/contact2/view-models/steps';
import { applyEffect } from '@/modules/contact2/view-models/steps/sending';
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
    applyEffect(state, dispatch, setError);
  }, [dispatch, setError, state, state.formData]);

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
