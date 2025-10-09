//
// イベントハンドラー
//
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/client-error-handler';
import { Pager } from '@/presentation/(system)/pagination/mvvm/models/types';
import { Action, toResults } from '@/presentation/(system)/pagination/mvvm/models/reducer';
import 'client-only';
import React from 'react';

/**
 * 次へ／前へボタンを押したとき
 *
 * @typeParam T - アイテムの型
 */
export async function handlePagination<T>(
  destination: 'next' | 'prev',
  pager: React.RefObject<Pager<T> | null>,
  dispatch: React.ActionDispatch<[action: Action<T>]>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  await withErrorHandlingAsync(() => func(), setError);

  async function func() {
    if (pager?.current == null) {
      return;
    }
    const page = destination === 'next' ? await pager.current.next() : await pager.current.prev();
    toResults(dispatch, page.items, page.currentPage);
  }
}
