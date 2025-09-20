//
// ページネーション共通コンポーネント
//
'use client';

import { PaginationView } from '@/app/(system)/pagination/mvvm2/views/pagination-view';
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/modules/(system)/error-handlers/client-error-handler';
import { createPager } from '@/modules/(system)/pagination/mvvm/models/pager';
import { FetchPage, Pager } from '@/modules/(system)/pagination/mvvm/models/types';
import { reducer, toResults } from '@/modules/(system)/pagination/mvvm/view-models/reducer';
import React, { useEffect, useReducer, useRef, useState } from 'react';

export function Pagination<TItems, TQuery>({
  children,
  search,
  fetchCallback,
  initialPage,
  perPage,
  query,
  setItems,
}: {
  children?: React.ReactNode;
  search: boolean;
  fetchCallback: FetchPage<TItems, TQuery>;
  initialPage: number;
  perPage: number;
  query: TQuery;
  setItems: React.Dispatch<React.SetStateAction<TItems>>;
}) {
  const [state, dispatch] = useReducer(reducer<TItems>, { step: 'initial' });
  const [error, setError] = useState(false);
  const pager = useRef<Pager<TItems>>(null);

  console.log('mvvm2');

  /**
   * 検索実行
   */
  useEffect(() => {
    withErrorHandlingAsync(() => func(), setError);

    async function func() {
      if (!search) {
        return;
      }
      pager.current = createPager(fetchCallback, { initialPage, perPage, query });
      const page = await pager.current.current();
      toResults(dispatch, page.items, page.currentPage);
    }
  }, [fetchCallback, initialPage, perPage, query, search]);

  /**
   * 検索結果の反映
   */
  useEffect(() => {
    withErrorHandling(() => func(), setError);

    function func() {
      if (state.step === 'results') {
        setItems(state.items);
      }
    }
  }, [setItems, state]);

  /**
   * 次へボタン押下
   */
  function handleNext() {
    withErrorHandlingAsync(() => func(), setError);

    async function func() {
      if (pager?.current == null) {
        return;
      }
      const page = await pager.current.next();
      toResults(dispatch, page.items, page.currentPage);
    }
  }

  /**
   * 前へボタン押下
   */
  function handlePrev() {
    withErrorHandlingAsync(() => func(), setError);

    async function func() {
      if (pager?.current == null) {
        return;
      }
      const page = await pager.current.prev();
      toResults(dispatch, page.items, page.currentPage);
    }
  }

  return (
    <PaginationView
      error={error}
      search={search}
      state={state}
      query={query}
      onPrev={() => handlePrev()}
      onNext={() => handleNext()}
    >
      {children}
    </PaginationView>
  );
}
