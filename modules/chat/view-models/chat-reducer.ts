'use client';

import { Dispatch, Reducer } from 'react';

/**
 * 入力フォームのキー
 * プロンプト、AIモデル
 */
export type FormKey = 'prompt' | 'ai_model';

/**
 * フォームの値を格納するオブジェクトの定義
 */
export type FormData = {
  [key in FormKey]: string;
};

/**
 * ステップ
 * 入力待ち、読み込み中
 */
export type ChatStep = 'idle' | 'loading';

/**
 * 会話者
 * あなた、AI
 */
export type ChatRole = 'user' | 'assistant';

/**
 * チャットの構造定義
 * 会話者、メッセージ
 */
export interface Chat {
  role: ChatRole;
  message: string;
}

/**
 * チャット履歴
 */
export type ChatHist = Chat[];

/**
 * 状態定義
 * ステップ、フォームデータ、チャット履歴、読み込み中のチャット
 */
export type State = {
  step: ChatStep;
  formData: FormData;
  chatHist?: ChatHist;
  loadingChat?: Chat;
};

/**
 * 状態の初期値
 */
export const initialState: State = {
  step: 'idle',
  formData: { prompt: '', ai_model: 'gemini-1.5-flash-001' },
};

/**
 * アクション定義
 */
export type Action =
  | { type: 'setValue'; key: FormKey; value: string }
  | { type: 'addChatHist'; chat: Chat }
  | { type: 'startResponse' }
  | { type: 'appendResponse'; chunk: string }
  | { type: 'completeResponse' };

/**
 * 状態の更新：フォームに値を入力
 */
export function setValue(
  dispatch: Dispatch<Action>,
  key: FormKey,
  value: string,
): void {
  dispatch({ type: 'setValue', key, value });
}

/**
 * 状態の更新：チャット履歴を追加
 */
export function addChatHist(dispatch: Dispatch<Action>, chat: Chat): void {
  dispatch({ type: 'addChatHist', chat });
}

/**
 * 状態の更新：AIチャットの読み込み開始
 */
export function startResponse(dispatch: Dispatch<Action>): void {
  dispatch({ type: 'startResponse' });
}

/**
 * 状態の更新：AIチャットの読み込み中（AIチャットAPIのレスポンスのチャンク（１文字）を表示に追加する）
 */
export function appendResponse(
  dispatch: Dispatch<Action>,
  chunk: string,
): void {
  dispatch({ type: 'appendResponse', chunk });
}

/**
 * 状態の更新：AIチャットの読み込み完了
 */
export function completeResponse(dispatch: Dispatch<Action>): void {
  dispatch({ type: 'completeResponse' });
}

/**
 * 状態管理関数
 * 現在の状態とアクションを受け取り、新しい状態を返す
 */
export const reducer: Reducer<State, Action> = (
  state: State,
  action: Action,
): State => {
  switch (action.type) {
    case 'setValue':
      return setValueState(state, action);
    case 'addChatHist':
      return addChatHistState(state, action);
    case 'startResponse':
      return startResponseState(state);
    case 'appendResponse':
      return appendResponseState(state, action);
    case 'completeResponse':
      return completeResponseState(state);
    default:
      return state;
  }
};

const setValueState = (
  state: State,
  action: Extract<Action, { type: 'setValue' }>,
): State => {
  return {
    ...state,
    formData: { ...state.formData, [action.key]: action.value },
  };
};

const addChatHistState = (
  state: State,
  action: Extract<Action, { type: 'addChatHist' }>,
): State => {
  // チャット履歴にチャットを追加
  return {
    ...state,
    chatHist: [...(state.chatHist ?? []), action.chat],
  };
};

const startResponseState = (state: State): State => {
  // 読み込み中チャットに、空のAIチャットを追加する
  return {
    ...state,
    step: 'loading',
    loadingChat: { role: 'assistant', message: '' },
  };
};

const appendResponseState = (
  state: State,
  action: Extract<Action, { type: 'appendResponse' }>,
): State => {
  if (!state.loadingChat) return state;
  // AIチャットのレスポンスチャンク（１文字）を、読み込み中チャットに追加する
  return {
    ...state,
    step: 'loading',
    loadingChat: {
      ...state.loadingChat,
      message: state.loadingChat.message + action.chunk,
    },
  };
};

const completeResponseState = (state: State): State => {
  if (!state.loadingChat) {
    return {
      ...state,
      step: 'idle',
    };
  }
  // チャット履歴にAIチャットを追加して、読み込み中チャットからは削除する。
  return {
    ...state,
    step: 'idle',
    chatHist: [...(state.chatHist ?? []), state.loadingChat],
    loadingChat: undefined,
  };
};
