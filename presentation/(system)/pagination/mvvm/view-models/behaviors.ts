//
// UI の振る舞いロジック
//
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { Pager } from '@/presentation/(system)/pagination/mvvm/models/types';
import { Action, toResults } from '@/presentation/(system)/pagination/mvvm/view-models/reducer';
import 'client-only';
import React from 'react';

// 型の別名。よく使う型名の名前が長いので、短い別名を作成
type PagerRef<T> = React.RefObject<Pager<T> | null>;
type ItemsDispatch<T> = React.ActionDispatch<[action: Action<T>]>;
type SetError = React.Dispatch<React.SetStateAction<boolean>>;

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
