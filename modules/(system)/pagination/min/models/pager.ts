import { FetchPage, Pager, PagerResult } from '@/modules/(system)/pagination/min/models/types';
import {
  calcPagination,
  offsetOfLastPage,
  pageToOffset,
  toEffectiveOffsetMin,
} from '@/modules/(system)/pagination/min/models/utils';
import 'client-only';

/**
 * ページャ関数を返す
 *
 * @typeParam T - 結果リストの型
 * @typeParam Q - 検索条件の型
 *
 * @param fetch - データ取得関数
 * @param params - パラメーター
 * @returns ページャ関数
 */
export function createPager<T, Q>(
  fetch: FetchPage<T, Q>,
  params: { initialPage?: number; perPage: number; query: Q },
): Pager<T> {
  const { perPage, query } = params;
  const initPage = params.initialPage ?? 1;
  const limit = perPage;
  let { offset } = pageToOffset(perPage, initPage);

  // データ取得関数を使ってページデータを取得する関数を作成する
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

  // ページャ関数を作成する。
  // 検索条件や表示件数などは関数の中にエンクロージングされる
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

  // ページャ関数を返す
  return pager;
}
