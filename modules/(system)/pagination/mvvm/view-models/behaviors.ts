//
// UI の振る舞いロジック
//
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/modules/(system)/error-handlers/client-error-handler';
import { createPager } from '@/modules/(system)/pagination/mvvm/models/pager';
import { FetchPage, Pager } from '@/modules/(system)/pagination/mvvm/models/types';
import { Action, State, toResults } from '@/modules/(system)/pagination/mvvm/view-models/reducer';
import 'client-only';
import React from 'react';

// 型の別名。よく使う型名の名前が長いので、短い別名を作成
type PagerRef<T> = React.RefObject<Pager<T> | null>;
type ItemsDispatch<T> = React.ActionDispatch<[action: Action<T>]>;
type SetError = React.Dispatch<React.SetStateAction<boolean>>;
type SetItems<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * 検索の実行
 */
export async function executeSearch<T, Q>(
  search: boolean,
  pager: PagerRef<T>,
  fetchCallback: FetchPage<T, Q>,
  initialPage: number,
  perPage: number,
  query: Q,
  dispatch: ItemsDispatch<T>,
  setError: SetError,
) {
  withErrorHandlingAsync(() => func(), setError);

  async function func() {
    if (!search) {
      return;
    }
    pager.current = createPager(fetchCallback, { initialPage, perPage, query });
    const page = await pager.current.current();
    toResults(dispatch, page.items, page.currentPage);
  }
}

/**
 * 検索結果のアイテムをUIに適用
 *
 * @typeParam T - アイテムの型
 */
export function applyItems<T>(state: State<T>, setItems: SetItems<T>, setError: SetError): void {
  withErrorHandling(() => func(), setError);

  function func() {
    if (state.step === 'results') {
      setItems(state.items);
    }
  }
}

/**
 * 次へ／前へボタンを押したとき
 *
 * @typeParam T - アイテムの型
 */
export async function handlePagination<T>(
  destination: 'next' | 'prev',
  pager: PagerRef<T>,
  dispatch: ItemsDispatch<T>,
  setError: SetError,
): Promise<void> {
  withErrorHandlingAsync(() => func(), setError);

  async function func() {
    if (pager?.current == null) {
      return;
    }
    const page = destination === 'next' ? await pager.current.next() : await pager.current.prev();
    toResults(dispatch, page.items, page.currentPage);
  }
}
