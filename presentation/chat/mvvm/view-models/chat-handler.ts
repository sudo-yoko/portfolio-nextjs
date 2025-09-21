'use client';

import { send } from '@/presentation/chat/mvvm/view-models/chat-sender';
import { Chunk } from '@/presentation/chat/mvvm/models/chat-types';
import {
  Action,
  addChatHist,
  appendResponse,
  completeResponse,
  setValue,
  startResponse,
  State,
} from '@/presentation/chat/mvvm/view-models/chat-reducer';
import { RefObject } from 'react';

/**
 * 送信ボタン押下時処理
 */
export async function handleSend(
  isCanceled: RefObject<boolean>,
  state: State,
  dispatch: React.ActionDispatch<[action: Action]>,
) {
  const { prompt, ai_model } = state.formData;
  if (!prompt || prompt.trim() === '') {
    return;
  }
  // チェット履歴に質問を追加
  addChatHist(dispatch, {
    role: 'user',
    message: prompt,
  });
  // テキストボックスをクリア
  setValue(dispatch, 'prompt', '');
  // AIチャットの読み込み開始
  startResponse(dispatch);
  // ストリーミング応答のキャンセル用コントローラー
  const controller = new AbortController();
  // AI API呼び出し
  const res = await send(prompt, ai_model, controller.signal);
  if (!res.body) {
    return;
  }
  // AIチャットの回答を１文字ずつ表示に追加する
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    if (isCanceled.current) {
      controller.abort();
      break;
    }
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    // JSONデータが複数件まとめて届く場合があるため改行で分割してパースする
    chunk.split('\n').forEach((line) => {
      if (line.trim() !== '') {
        const parsed: Chunk = JSON.parse(line);
        appendResponse(dispatch, parsed.value);
      }
    });
  }
  // AIチャットの読み込み完了
  completeResponse(dispatch);
  isCanceled.current = false;
}

/**
 * キャンセルボタン押下時処理
 */
export async function handleCancel(isCanceled: RefObject<boolean>) {
  isCanceled.current = true;
}
