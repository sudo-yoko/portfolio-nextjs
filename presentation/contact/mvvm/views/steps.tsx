'use client';

import { ErrorHandler } from '@/presentation/(system)/error-handlers/error-handler';
import { initialState, reducer } from '@/presentation/contact/mvvm/view-models/contact2-reducer';
import Complete from '@/presentation/contact/mvvm/views/complete';
import Confirm from '@/presentation/contact/mvvm/views/confirm';
import Input from '@/presentation/contact/mvvm/views/input';
import Sending from '@/presentation/contact/mvvm/views/sending';
import { useReducer, useState } from 'react';

/**
 * お問い合わせフォーム 親クライアントコンポーネント
 */
export default function Steps() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(false);
  return (
    <div className="flex h-screen w-screen flex-col items-center py-10">
      {error && <ErrorHandler />}
      {state.step === 'input' && <Input state={state} dispatch={dispatch} />}
      {state.step === 'confirm' && <Confirm state={state} dispatch={dispatch} />}
      {state.step === 'sending' && <Sending state={state} dispatch={dispatch} setError={setError} />}
      {state.step === 'complete' && <Complete />}
    </div>
  );
}
