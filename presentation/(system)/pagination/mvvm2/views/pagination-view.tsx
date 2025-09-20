//
// ページネーション共通コンポーネント
//
'use client';

import { ErrorHandler } from '@/app/(system)/error-handler';
import { State } from '@/presentation/(system)/pagination/mvvm/view-models/reducer';
import React from 'react';

export function PaginationView<TItems, TQuery>({
  error,
  search,
  state,
  query,
  onPrev,
  onNext,
  children,
}: {
  error: boolean;
  search: boolean;
  state: State<TItems>;
  query: TQuery;
  onPrev: () => void;
  onNext: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      {error && <ErrorHandler />}
      {search && state.step === 'results' && (
        <div>
          <div>検索条件：{JSON.stringify(query)}</div>
          <Controller onPrev={onPrev} onNext={onNext} page={state.page} />
          {children && (
            <div>
              <div>{children}</div>
              <Controller onPrev={onPrev} onNext={onNext} />
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
