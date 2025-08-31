//
// totalが常に取得できる前提の設計
// 連打に非対応（呼び元で制御必要）
//

const OFFSET_START = 1 as const;

export type PageFetcher<TItems, TQuery> = (
  offset: number,
  limit: number,
  query: TQuery,
) => Promise<PageFetcherResult<TItems>>;

export type PageFetcherResult<TItems> = {
  total: number;
  items: TItems;
};

/**
 * ページング制御オブジェクト
 *
 * @typeParam T - ページ内アイテム(リスト)の型
 */
export interface Pager<T> {
  /**
   * 現在のページを取得する
   */
  current(): Promise<PagerResult<T>>;
  /**
   * 次ページを取得する
   */
  next(): Promise<PagerResult<T>>;
  /**
   * 前ページを取得する
   */
  prev(): Promise<PagerResult<T>>;
}

/**
 * Pagerが返す結果
 *
 * @typeParam T - ページ内アイテム(リスト)の型
 */
export type PagerResult<T> = {
  total: number;
  items: T;
  offset: number; // 実効オフセット（補正あり）
  hasNext: boolean;
  hasPrev: boolean;
};

/**
 * Pager を作成して返す
 *
 * @typeParam L - 結果リストの型
 * @typeParam Q - 検索条件の型
 *
 * @param fetcher - aaa
 * @param param - sss
 * @returns Pager を作成して返す
 */
export async function createPager<T, TQuery>(
  fetcher: PageFetcher<T, TQuery>,
  param: { offset: number; limit: number; query: TQuery },
): Promise<Pager<T>> {
  const { query } = param;
  let { offset, limit } = param;

  offset = Math.max(OFFSET_START, Math.floor(offset));
  limit = Math.max(1, Math.floor(limit));

  const fetchData = async (): Promise<PagerResult<T>> => {
    if (offset < OFFSET_START) {
      // 実効オフセットに補正
      offset = OFFSET_START;
    }

    let { total, items } = await fetcher(offset, limit, query);
    if (total === 0) {
      return { total, offset, items, hasNext: false, hasPrev: false };
    }

    if (offset > total) {
      // 実効オフセットに補正して再取得
      offset = OFFSET_START + Math.floor((total - 1) / limit) * limit; // 最終ページの先頭の1件目
      ({ total, items } = await fetcher(offset, limit, query));
    }

    const hasNext = offset + limit - OFFSET_START < total;
    const hasPrev = offset > OFFSET_START;
    return { total, offset, items, hasNext, hasPrev };
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
