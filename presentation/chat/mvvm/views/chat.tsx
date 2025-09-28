'use client';

import { handleCancel, handleSend } from '@/presentation/chat/mvvm/view-models/chat-handler';
import type { Chat } from '@/presentation/chat/mvvm/view-models/chat-reducer';
import { initialState, reducer, setValue } from '@/presentation/chat/mvvm/view-models/chat-reducer';
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
            <div key={index}>{chat.role === 'user' ? <ChatYou chat={chat} /> : <ChatAI chat={chat} />}</div>
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
    return <div>{chat.role === 'user' ? <ChatYou chat={chat} /> : <ChatAI chat={chat} />}</div>;
  }

  function ChatYou({ chat }: { chat: Chat }) {
    return (
      <div>
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
        <div>あなた：{chat.message}</div>
      </div>
    );
  }

  function ChatAI({ chat }: { chat: Chat }) {
    return (
      <div>
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div>AI：{chat.message}</div>
      </div>
    );
  }
}
