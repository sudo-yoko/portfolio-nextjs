'use client';

import { send } from '@/modules/chat/chat-client';
import { Chunk } from '@/modules/chat/model-api';
import type { Chat } from '@/modules/chat/model-ui';
import {
  addChatHist,
  appendResponse,
  completeResponse,
  initialState,
  reducer,
  setValue,
  startResponse,
} from '@/modules/chat/model-ui';
import { useReducer } from 'react';

/**
 * AIチャット クライアントコンポーネント
 */
export default function Chat() {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * 送信ボタン押下時処理
   */
  async function handleSend() {
    if (!state.formData.prompt || state.formData.prompt.trim() === '') {
      return;
    }
    // チェット履歴に質問を追加
    addChatHist(dispatch, {
      role: 'user',
      message: state.formData.prompt,
    });
    // テキストボックスをクリア
    setValue(dispatch, 'prompt', '');
    // AIチャットの読み込み開始
    startResponse(dispatch);
    const res = await send(state.formData.prompt, state.formData.ai_model);
    if (!res.body) {
      return;
    }
    // AIチャットの回答を１文字ずつ表示に追加する
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const parsed: Chunk = JSON.parse(chunk);
      appendResponse(dispatch, parsed.value);
    }
    // AIチャットの読み込み完了
    completeResponse(dispatch);
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center space-y-9 p-20">
      <div className="flex w-[700px] flex-col space-y-9">
        <div className="font-bold">AI チャット</div>
        <div className="space-y-4">
          {state.chatHist?.map((chat, index) => (
            <div key={index}>
              {chat.role === 'user' ? 'あなた' : 'AI'}：{chat.message}
            </div>
          ))}
          {state.loadingChat && <LoadingChat chat={state.loadingChat} />}
        </div>
        <div className="flex w-full flex-row space-x-2">
          <input
            type="text"
            value={state.formData.prompt}
            onChange={(e) => setValue(dispatch, 'prompt', e.target.value)}
            placeholder="質問を入力してください。"
            className="w-[700px] rounded border border-indigo-300 p-2"
          />
          {state.step === 'loading' ? (
            <button
              type="button"
              disabled
              className="w-28 whitespace-nowrap rounded-lg bg-gray-300 px-4 py-2 text-white"
            >
              送信
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
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
