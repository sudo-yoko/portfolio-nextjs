//
// totalが常に取得できる前提の設計
// 連打に非対応（呼び元で制御必要）
//

import { Pager, PagerAction, PagerResult } from '@/modules/(system)/pager/types';
import { offsetOfLastPage, pageToOffset } from '@/modules/(system)/pager/utils';
import 'client-only';

/**
 * Pager を作成して返す
 *
 * @typeParam L - 結果リストの型
 * @typeParam Q - 検索条件の型
 *
 * @param action - ページネーションで使用するサーバーアクションを指定する
 * @param actionArgs -
 * @returns
 */
export function createPager<T, Q>(
  action: PagerAction<T, Q>,
  actionArgs: { initialPage?: number; perPage: number; query: Q },
): Pager<T> {
  const { perPage, query } = actionArgs;
  const initPage = actionArgs.initialPage ?? 1;
  let { offset } = pageToOffset(perPage, initPage);
  const limit = perPage;

  //offset = Math.max(OFFSET_START, Math.floor(offset));
  //limit = Math.max(1, Math.floor(limit));

  const fetchData = async (): Promise<PagerResult<T>> => {
    // 実効オフセットに補正
    if (offset < 0) offset = 0;

    let { body } = await action(offset, limit, query);
    let { total, items } = body!;
    if (total === 0) {
      return { total, offset, items, hasNext: false, hasPrev: false, page: 0, totalPage: 0 };
    }

    // 実効オフセットに補正して再取得
    if (offset > total) {
      offset = offsetOfLastPage(total, limit); // 最終ページの先頭の1件目
      ({ body } = await action(offset, limit, query));
      ({ total, items } = body!);
    }

    const hasNext = offset + limit < total;
    const hasPrev = offset > 0;
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
