//
// カスタムフック
//
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/error-handlers/client-error-handler';
import { createPager } from '@/presentation/(system)/pagination/mvvm/models/pager';
import { FetchPage, Pager } from '@/presentation/(system)/pagination/mvvm/models/types';
import { reducer, toResults } from '@/presentation/(system)/pagination/mvvm/models/reducer';
import { useEffect, useReducer, useRef, useState } from 'react';

//
export function usePagination<TItems, TQuery>({
  search,
  fetchCallback,
  initialPage,
  perPage,
  query,
  setItems,
}: {
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

  console.log('presentation');

  /**
   * 検索時
   */
  useEffect(() => {
    void (async () => {
      await withErrorHandlingAsync(() => func(), setError);
    })();

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
    // dispatchした結果のstateを同じeffect内で安全に見られない。
    // dispatchした結果のstateを他コンポーネントに連携する関係で結果のstateを取得する必要がある。
    // そのため別の依存配列の別effectにしている。
    withErrorHandling(() => func(), setError);

    function func() {
      if (state.step === 'results') {
        setItems(state.items);
      }
    }
  }, [setItems, state]);

  return { error, state, pager, dispatch, setError };
}
