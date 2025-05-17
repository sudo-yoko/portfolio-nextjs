'use client';

import { initialState, reducer, setValue } from '@/modules/chat/model';
import { useReducer } from 'react';

/**
 * チャットUIコンポーネント
 */
export default function Chat() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSend() {
    if (!state.formData.prompt || state.formData.prompt.trim() === '') {
      return;
    }
    alert('送信');
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center space-y-9 p-20">
      <div className="flex w-1/2 flex-col items-center space-y-9">
        <div>AI チャット</div>
        <div className="space-y-4">
          <div>あなた：今日の天気予報を教えてください。</div>
          <div>
            AI：きょう17日は、西～東日本では雨の降る所が多く、雷を伴って激しく降る所もあるでしょう。落雷や突風などに注意してください。東北は雨が降り、北海道も夕方以降は雨が降る見込みです。あす18日は、九州南部では激しい雷雨となる所がありそうです。九州北部～北海道は雲が広がりやすく、所によりにわか雨がある見込みです。沖縄はあすにかけて概ね晴れるでしょう。
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <div>
          <div className="flex w-full flex-row items-center space-x-2">
            <input
              type="text"
              onChange={(e) => setValue(dispatch, 'prompt', e.target.value)}
              placeholder="質問を入力してください。"
              className="w-[700px] rounded border border-indigo-300 p-2"
            />
            <button
              type="button"
              onClick={handleSend}
              className="whitespace-nowrap rounded-lg bg-indigo-300 px-4 py-2"
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
