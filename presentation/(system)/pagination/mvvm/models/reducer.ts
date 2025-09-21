//
// 状態管理
//
import React from 'react';

/**
 * ステップ定義
 * - initial  - 初期状態(検索前)
 * - results  - 検索結果
 */
export type Step = 'initial' | 'results';

/**
 * 状態定義
 * - step   - ステップ
 * - items  - リストアイテム
 */
export type State<T> = Initial | Results<T>;

export type Initial = {
  step: 'initial';
  items?: undefined;
  page?: undefined;
};

export type Results<T> = {
  step: 'results';
  items: T;
  page: number;
};

/**
 * アクション定義
 * - setItems - 検索結果のセット
 * - reset    - 検索結果のリセット
 */
export type Action<T> = { type: 'setItems'; items: T; page: number } | { type: 'reset' };

/**
 * 状態管理関数
 *
 * 現在の状態とアクションを受け取り、新しい状態を返す
 */
// constを使って型注釈をつける場合、型パラメータは使えない
export function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'setItems':
      const results: Results<T> = { step: 'results', items: action.items, page: action.page };
      return results;
    case 'reset':
      const initial: Initial = { step: 'initial' };
      return initial;
    default:
      return state;
  }
}

/**
 * 状態の更新：検索結果のセット
 */
export function toResults<T>(
  dispatch: React.ActionDispatch<[action: Action<T>]>,
  items: T,
  page: number,
): void {
  const action: Action<T> = { type: 'setItems', items, page };
  dispatch(action);
}

/**
 * 状態の更新：検索結果のリセット
 */
export function toInitial<T>(dispatch: React.ActionDispatch<[action: Action<T>]>): void {
  const action: Action<never> = { type: 'reset' };
  dispatch(action);
}
