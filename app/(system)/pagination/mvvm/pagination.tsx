//
// ページネーション共通コンポーネント
//
'use client';

import { ErrorHandler } from '@/app/(system)/error-handler';
import { FetchPage, Pager } from '@/modules/(system)/pagination/mvvm/models/types';
import {
  applyItems,
  executeSearch,
  handlePagination,
} from '@/modules/(system)/pagination/mvvm/view-models/behaviors';
import { reducer } from '@/modules/(system)/pagination/mvvm/view-models/reducer';
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

  /**
   * 検索時
   */
  useEffect(() => {
    executeSearch(search, pager, fetchCallback, initialPage, perPage, query, dispatch, setError);
  }, [fetchCallback, initialPage, perPage, query, search]);

  /**
   * 検索結果の反映
   */
  useEffect(() => {
    // dispatchした結果のstateを同じeffect内で安全に見られない。
    // dispatchした結果のstateを他コンポーネントに連携する関係で結果のstateを取得する必要がある。
    // そのため別の依存配列の別effectにしている。
    applyItems(state, setItems, setError);
  }, [setItems, state]);

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
