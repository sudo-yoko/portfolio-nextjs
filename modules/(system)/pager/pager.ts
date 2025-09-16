//
// クライアントサイド用にページネーションを提供する
//
// totalが常に取得できる前提の設計
// 連打に非対応（呼び元で制御必要）
//

import { Pager, FetchPage, PagerResult } from '@/modules/(system)/pager/types';
import { calcPagination, offsetOfLastPage, pageToOffset } from '@/modules/(system)/pager/utils';
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
  let { offset } = pageToOffset(perPage, initPage);
  const limit = perPage;

  //offset = Math.max(OFFSET_START, Math.floor(offset));
  //limit = Math.max(1, Math.floor(limit));

  const fetchData = async (): Promise<PagerResult<T>> => {
    // 実効オフセットに補正
    if (offset < 0) offset = 0;

    let { total, items } = await fetch(offset, limit, query);
    if (total === 0) {
      const { effectiveOffset, currentPage, totalPages } = calcPagination(offset, limit, total);
      return {
        total,
        offset: effectiveOffset,
        items,
        hasNext: false,
        hasPrev: false,
        page: currentPage,
        totalPage: totalPages,
      };
    }

    // 実効オフセットに補正して再取得
    if (offset > total) {
      offset = offsetOfLastPage(total, limit); // 最終ページの先頭の1件目
      ({ total, items } = await fetch(offset, limit, query));
    }

    const hasNext = offset + limit < total;
    const hasPrev = offset > 0;
    const { effectiveOffset, currentPage, totalPages } = calcPagination(offset, limit, total);
    return {
      total,
      offset: effectiveOffset,
      items,
      hasNext,
      hasPrev,
      page: currentPage,
      totalPage: totalPages,
    };
  };

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
