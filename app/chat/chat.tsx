'use client';

import { handleCancel, handleSend } from '@/modules/chat/view-models/chat-handler';
import type { Chat } from '@/modules/chat/view-models/chat-reducer';
import { initialState, reducer, setValue } from '@/modules/chat/view-models/chat-reducer';
import { useReducer, useRef } from 'react';

/**
 * AIチャット クライアントコンポーネント
 */
export default function Chat() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isCanceled = useRef(false);
  return (
    <div className="flex h-screen w-screen flex-col items-center space-y-9 p-10">
      <div className="flex w-full flex-col space-y-9 md:w-[700px]">
        <div className="font-bold">AI チャット</div>
        <div className="space-y-4">
          {state.chatHist?.map((chat, index) => (
            <div key={index}>
              {chat.role === 'user' ? 'あなた' : 'AI'}：{chat.message}
            </div>
          ))}
          {state.loadingChat && <LoadingChat chat={state.loadingChat} />}
        </div>
        <div className="flex w-full flex-col items-center gap-2 md:flex-row">
          <input
            type="text"
            value={state.formData.prompt}
            onChange={(e) => setValue(dispatch, 'prompt', e.target.value)}
            placeholder="質問を入力してください。"
            className="w-full rounded border border-indigo-300 p-2 md:w-[700px]"
          />
          {state.step === 'loading' ? (
            <button
              type="button"
              onClick={() => handleCancel(isCanceled)}
              className="w-28 whitespace-nowrap rounded-lg bg-lime-500 px-4 py-2 text-white"
            >
              取消
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSend(isCanceled, state, dispatch)}
              className="w-28 whitespace-nowrap rounded-lg bg-indigo-300 px-4 py-2"
            >
              送信
            </button>
          )}
        </div>
      </div>
    </div>
  );

  /**
   * 読み込み中のAIチャットを表示するコンポーネント
   */
  function LoadingChat({ chat }: { chat: Chat }) {
    return (
      <div>
        {chat.role === 'user' ? 'あなた' : 'AI'}：{chat.message}
      </div>
    );
  }
}
