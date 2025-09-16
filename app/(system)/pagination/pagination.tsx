//
// ページネーション共通コンポーネント
//
'use client';

import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { createPager } from '@/modules/(system)/pager/pager';
import { FetchPage, Pager } from '@/modules/(system)/pager/types';
import React, { useEffect, useRef, useState } from 'react';

export function Pagination<TItems, TQuery>({
  fetchCallback,
  initialPage,
  perPage,
  queryMemo,
  setItems,
  setError,
}: {
  fetchCallback: FetchPage<TItems, TQuery>;
  initialPage: number;
  perPage: number;
  queryMemo: TQuery;
  setItems: React.Dispatch<React.SetStateAction<TItems>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [page, setPage] = useState(initialPage);
  const pager = useRef<Pager<TItems>>(null);

  useEffect(() => {
    withErrorHandlingAsync(() => func(), setError);

    async function func() {
      pager.current = createPager(fetchCallback, { initialPage, perPage, query: queryMemo });
      const current = await pager.current.current();
      setItems(current.items);
      setPage(current.page);
    }
    //}, [fetch, fetchArgs, setItems]); // これらを依存配列に入れると親が再レンダリングされるたびに参照が新しくなり無限ループになる
  }, [fetchCallback, initialPage, perPage, queryMemo, setError, setItems, setPage]);

  function handleNext() {
    // Promiseチェーンで書く場合は、withErrorHandlingのエラーハンドリングは効果が無いので
    // 以下のようにエラーハンドリングを記述する
    pager.current
      ?.next()
      .then((p) => {
        setItems(p.items);
        setPage(p.page);
      })
      .catch((_e) => setError(true));
  }

  function handlePrev() {
    pager.current
      ?.prev()
      .then((p) => {
        setItems(p.items);
        setPage(p.page);
      })
      .catch((_e) => setError(true));
  }

  return (
    <div>
      <button type="button" onClick={() => handlePrev()} className="rounded-lg bg-indigo-300 px-4 py-2">
        前へ
      </button>
      {page}
      <button type="button" onClick={() => handleNext()} className="rounded-lg bg-indigo-300 px-4 py-2">
        次へ
      </button>
    </div>
  );
}
