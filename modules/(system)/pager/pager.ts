//
// クライアントサイド用にページネーションを提供する
//
// totalが常に取得できる前提の設計
// 連打に非対応（呼び元で制御必要）
//

import { Pager, FetchPage, PagerResult } from '@/modules/(system)/pager/types';
import {
  calcPagination,
  offsetOfLastPage,
  pageToOffset,
  toEffectiveOffsetMin,
} from '@/modules/(system)/pager/utils';
import 'client-only';

/**
 * Pager を作成して返す
 *
 * @typeParam L - 結果リストの型
 * @typeParam Q - 検索条件の型
 *
 * @param fetcher - ページネーションで使用するサーバーアクションを指定する
 * @param fetchArgs -
 * @returns
 */
export function createPager<T, Q>(
  fetch: FetchPage<T, Q>,
  fetchArgs: { initialPage?: number; perPage: number; query: Q },
): Pager<T> {
  const { perPage, query } = fetchArgs;
  const initPage = fetchArgs.initialPage ?? 1;
  const limit = perPage;
  let { offset } = pageToOffset(perPage, initPage);

  /**
   * データ取得関数
   */
  const fetchData = async (): Promise<PagerResult<T>> => {
    //
    // 実効オフセットに補正（下限値）
    //
    offset = toEffectiveOffsetMin(offset);
    //
    // データ取得
    //
    let { total, items } = await fetch(offset, limit, query);
    //
    // データなし
    //
    if (total === 0) {
      const { effectiveOffset, currentPage, totalPages } = calcPagination(offset, limit, total);
      offset = effectiveOffset;
      return { total, offset, items, hasNext: false, hasPrev: false, currentPage, totalPages };
    }
    //
    // 実効オフセットに補正（上限値）して再取得
    //
    if (offset > total) {
      offset = offsetOfLastPage(total, limit); // 最終ページの先頭の1件目
      ({ total, items } = await fetch(offset, limit, query));
    }
    //
    // データを返却
    //
    const hasNext = offset + limit < total;
    const hasPrev = offset > 0;
    const { effectiveOffset, currentPage, totalPages } = calcPagination(offset, limit, total);
    offset = effectiveOffset;
    return { total, offset, items, hasNext, hasPrev, currentPage, totalPages };
  };

  /**
   * ページャ関数を返す
   */
  const pager: Pager<T> = {
    current() {
      return fetchData();
    },
    next() {
      offset += limit;
      return fetchData();
    },
    prev() {
      offset -= limit;
      return fetchData();
    },
  };
  return pager;
}
