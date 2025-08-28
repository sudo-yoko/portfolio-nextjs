/**
 * View -- .tsx
 * ViewModel -- Viewに公開するもの。Viewの状態や操作
 * Model -- Viewに依存しない処理
 * 依存方向：View → VM → Model
 * total が常に取得できる前提の設計
 */

const offsetStart = 1;

export type PageFetcher<TItems, TQuery> = (
  offset1: number,
  limit: number,
  query: TQuery,
) => Promise<PageFetcherResult<TItems>>;

export type PageFetcherResult<TItems> = {
  total: number;
  items: TItems;
};

export interface Pager<TItems> {
  /**
   * 現在のページを取得する
   */
  current(): Promise<PagerResult<TItems>>;
  /**
   * 次ページを取得する
   */
  next(): Promise<PagerResult<TItems>>;
  /**
   * 前ページを取得する
   */
  prev(): Promise<PagerResult<TItems>>;
}

export type PagerResult<TItems> = {
  total: number;
  items: TItems;
  offset1: number;
  hasNext: boolean;
  hasPrev: boolean;
};

/**
 *
 * @typeParam L - 結果リストの型
 * @typeParam Q - 検索条件の型
 *
 * @param fetcher - aaa
 * @param param - sss
 * @returns Pagerインターフェースを実装したページャ関数を返す
 */
export function createPager<TItems, TQuery>(
  fetcher: PageFetcher<TItems, TQuery>,
  param: { offset1: number; limit: number; query: TQuery },
): Pager<TItems> {
  const { limit, query } = param;
  let { offset1 } = param;

  const fetchData = async (offset1: number): Promise<PagerResult<TItems>> => {
    if (offset1 < offsetStart) {
      offset1 = offsetStart;
    }
    const { total, items } = await fetcher(offset1, limit, query);
    if (offset1 > total) {
      offset1 = total;
    }
    const hasNext = offset1 + limit < total;
    const hasPrev = offset1 > offsetStart;
    return { total, offset1, items, hasNext, hasPrev };
  };

  // Pagerを返す
  return {
    current: () => fetchData(offset1),
    next: () => fetchData((offset1 += limit)),
    prev: () => fetchData((offset1 -= limit)),
  };
}
