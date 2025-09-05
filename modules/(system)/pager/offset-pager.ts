//
// totalが常に取得できる前提の設計
// 連打に非対応（呼び元で制御必要）
//

import 'client-only';
import { Pager, PagerAction, PagerResult } from './models/pager-model';

const OFFSET_START = 1 as const;

/**
 * Pager を作成して返す
 *
 * @typeParam L - 結果リストの型
 * @typeParam Q - 検索条件の型
 *
 * @param action - aaa
 * @param actionArgs - sss
 * @returns Pager を作成して返す
 */
export function createPager<T, Q>(
  action: PagerAction<T, Q>,
  actionArgs: { offset: number; limit: number; query: Q },
): Pager<T> {
  const { query, limit } = actionArgs;
  let { offset } = actionArgs;

  //offset = Math.max(OFFSET_START, Math.floor(offset));
  //limit = Math.max(1, Math.floor(limit));

  const fetchData = async (): Promise<PagerResult<T>> => {
    //if (offset < OFFSET_START) {
    // 実効オフセットに補正
    //offset = OFFSET_START;
    //}

    let { total, items } = await action(offset, limit, query);
    if (total === 0) {
      return { total, offset, items, hasNext: false, hasPrev: false, page: 0, totalPage: 0 };
    }

    if (offset > total) {
      // 実効オフセットに補正して再取得
      offset = OFFSET_START + Math.floor((total - 1) / limit) * limit; // 最終ページの先頭の1件目
      ({ total, items } = await action(offset, limit, query));
    }

    const hasNext = offset + limit - OFFSET_START < total;
    const hasPrev = offset > OFFSET_START;
    return { total, offset, items, hasNext, hasPrev, page: 0, totalPage: 0 };
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
