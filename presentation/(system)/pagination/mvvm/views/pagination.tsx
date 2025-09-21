//
// ページネーション共通コンポーネント
//
'use client';

import { ErrorHandler } from '@/presentation/(system)/error-handlers/error-handler';
import { FetchPage } from '@/presentation/(system)/pagination/mvvm/models/types';
import { handlePagination } from '@/presentation/(system)/pagination/mvvm/view-models/event-handlers';
import { usePagination } from '@/presentation/(system)/pagination/mvvm/view-models/use-pagination';
import React from 'react';

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
  const { error, state, pager, dispatch, setError } = usePagination({
    search,
    fetchCallback,
    initialPage,
    perPage,
    query,
    setItems,
  });

  return (
    <div>
      {error && <ErrorHandler />}
      {search && state.step === 'results' && (
        <div>
          <div>検索条件：{JSON.stringify(query)}</div>
          <Controller
            onPrev={() => handlePagination('prev', pager, dispatch, setError)}
            onNext={() => handlePagination('next', pager, dispatch, setError)}
            page={state.page}
          />
          {children && (
            <div>
              <div>{children}</div>
              <Controller
                onPrev={() => handlePagination('prev', pager, dispatch, setError)}
                onNext={() => handlePagination('next', pager, dispatch, setError)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Controller({ onPrev, onNext, page }: { onPrev: () => void; onNext: () => void; page?: number }) {
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
