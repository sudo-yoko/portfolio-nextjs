//
// ページネーション共通コンポーネント
//
'use client';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { createPager } from '@/modules/(system)/pager/pager';
import { FetchPage, Pager } from '@/modules/(system)/pager/types';
import 'client-only';

import { useEffect, useRef, useState } from 'react';

export function Pagination<TItems, TQuery>({
  fetch,
  fetchArgs,
  setItems,
}: {
  fetch: FetchPage<TItems, TQuery>;
  fetchArgs: { initialPage?: number; perPage: number; query: TQuery };
  setItems: React.Dispatch<React.SetStateAction<TItems>>;
}) {
  const pager = useRef<Pager<TItems>>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    withErrorHandlingAsync(() => func(), setError);

    async function func() {
      pager.current = createPager(fetch, fetchArgs);
      const current = await pager.current.current();
      setItems(current.items);
    }
  //}, [fetch, fetchArgs, setItems]); // これらを依存配列に入れると親が再レンダリングされるたびに参照が新しくなり無限ループになる
  }, []);

  function handleNext() {
    pager.current?.next().then((p) => setItems(p.items));
    //.catch((_e) => setError(true));
  }

  function handlePrev() {
    pager.current?.prev().then((p) => setItems(p.items));
    //.catch((_e) => setError(true));
  }

  return (
    <div>
      <button type="button" onClick={() => handlePrev()} className="rounded-lg bg-indigo-300 px-4 py-2">
        前へ
      </button>
      <button type="button" onClick={() => handleNext()} className="rounded-lg bg-indigo-300 px-4 py-2">
        次へ
      </button>
    </div>
  );
}
