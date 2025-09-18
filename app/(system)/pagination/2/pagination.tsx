//
// ページネーション共通コンポーネント
//
'use client';

import { ErrorHandler } from '@/app/(system)/error-handler';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { createPager } from '@/modules/(system)/pager/pager';
import { FetchPage, Pager } from '@/modules/(system)/pager/types';
import React, { useEffect, useRef, useState } from 'react';

export function Pagination<TItems, TQuery>({
  children,
  search,
  fetchCallback,
  initialPage,
  perPage,
  query,
  setItems,
}: {
  children: React.ReactNode;
  search: boolean;
  fetchCallback: FetchPage<TItems, TQuery>;
  initialPage: number;
  perPage: number;
  query: TQuery;
  setItems: React.Dispatch<React.SetStateAction<TItems>>;
}) {
  const [error, setError] = useState(false);
  const [page, setPage] = useState(initialPage);
  const pager = useRef<Pager<TItems>>(null);

  useEffect(() => {
    withErrorHandlingAsync(() => func(), setError);

    async function func() {
      if (!search) {
        return;
      }
      pager.current = createPager(fetchCallback, { initialPage, perPage, query });
      const page = await pager.current.current();
      setItems(page.items);
      setPage(page.currentPage);
    }
    //}, [fetch, fetchArgs, setItems]); // これらを依存配列に入れると親が再レンダリングされるたびに参照が新しくなり無限ループになる
  }, [fetchCallback, initialPage, perPage, query, search, setItems]);

  function handleNext() {
    // Promiseチェーンで書く場合は、withErrorHandlingのエラーハンドリングは効果が無いので
    // 以下のようにエラーハンドリングを記述する
    pager.current
      ?.next()
      .then((page) => {
        setItems(page.items);
        setPage(page.currentPage);
      })
      .catch((_e) => setError(true));
  }

  function handlePrev() {
    pager.current
      ?.prev()
      .then((page) => {
        setItems(page.items);
        setPage(page.currentPage);
      })
      .catch((_e) => setError(true));
  }

  return (
    <div>
      {error && <ErrorHandler />}
      {search && (
        <div>
          <div>検索条件：{JSON.stringify(query)}</div>
          <PagerControl onPrev={() => handlePrev()} onNext={() => handleNext()} page={page} />
          <div>{children}</div>
          <PagerControl onPrev={() => handlePrev()} onNext={() => handleNext()} />
        </div>
      )}
    </div>
  );
}

function PagerControl({ onPrev, onNext, page }: { onPrev: () => void; onNext: () => void; page?: number }) {
  return (
    <div>
      <button type="button" onClick={onPrev} className="rounded-lg bg-indigo-300 px-4 py-2">
        前へ
      </button>
      {page && page}
      <button type="button" onClick={onNext} className="rounded-lg bg-indigo-300 px-4 py-2">
        次へ
      </button>
    </div>
  );
}
