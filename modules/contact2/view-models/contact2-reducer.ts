// お問い合わせフォームのモデル定義
'use client';

import { FormData } from '@/modules/(system)/types/form-data';
import { Violations } from '@/modules/(system)/validators/validator';
import React, { Reducer } from 'react';

/**
 * 入力フォームのキー
 * お名前、メールアドレス、お問い合わせ内容
 */
export type FormKeys = 'name' | 'email' | 'body';

/**
 * フォームの値を格納するオブジェクトの定義
 */
//export type FormData = {
//  [key in FormKey]: string;
//};

/**
 * ステップ定義
 * 入力、確認、送信中、完了
 */
export type Step = 'input' | 'confirm' | 'sending' | 'complete';

/**
 * 状態定義
 * ステップ、フォームデータ、バリデーションエラー
 */
export type State = {
  step: Step;
  formData: FormData<FormKeys>;
  violations: Violations<FormKeys>;
};

/**
 * 初期状態
 */
export const initialState: State = {
  step: 'input',
  formData: { name: '', email: '', body: '' },
  violations: {},
};

/**
 * アクション定義
 */
export type Action =
  | { type: 'toInput' }
  | { type: 'toConfirm' }
  | { type: 'toSending' }
  | { type: 'toComplete' }
  | { type: 'setValue'; key: FormKeys; value: string }
  | { type: 'setViolations'; violations: Violations<FormKeys> };

/**
 * 状態の更新：フォームに値を入力
 */
export function setValue(
  dispatch: React.ActionDispatch<[action: Action]>,
  key: FormKeys,
  value: string,
): void {
  dispatch({ type: 'setValue', key, value });
}

/**
 * 状態の更新：入力モード
 */
export function toInput(dispatch: React.ActionDispatch<[action: Action]>): void {
  dispatch({ type: 'toInput' });
}

/**
 * 状態の更新：確認モード
 */
export function toConfirm(dispatch: React.ActionDispatch<[action: Action]>): void {
  dispatch({ type: 'toConfirm' });
}

/**
 * 状態の更新：送信中
 */
export function toSending(dispatch: React.ActionDispatch<[action: Action]>): void {
  dispatch({ type: 'toSending' });
}

/**
 * 状態の更新：完了
 */
export function toComplete(dispatch: React.ActionDispatch<[action: Action]>): void {
  dispatch({ type: 'toComplete' });
}

/**
 * 状態の更新：バリデーションエラー
 */
export function setViolations(
  dispatch: React.ActionDispatch<[action: Action]>,
  violations: Violations<FormKeys>,
): void {
  dispatch({ type: 'setViolations', violations });
}

/**
 * 状態管理関数
 * 現在の状態とアクションを受け取り、新しい状態を返す
 *
 * @param state - 現在の状態
 * @param action - dispatchに渡されたアクション
 * @returns 新しい状態
 */
export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setValue':
      return setValueState(state, action);
    case 'toInput':
      return { ...state, step: 'input' };
    case 'toConfirm':
      return { ...state, step: 'confirm', violations: {} };
    case 'toSending':
      return { ...state, step: 'sending' };
    case 'toComplete':
      return toCompleteState(state);
    case 'setViolations':
      return { ...state, violations: action.violations };
    default:
      return state;
  }
};

const setValueState = (state: State, action: Extract<Action, { type: 'setValue' }>): State => {
  return {
    ...state,
    formData: { ...state.formData, [action.key]: action.value },
  };
};

const toCompleteState = (state: State): State => {
  return {
    ...state,
    step: 'complete',
    violations: {},
  };
};
