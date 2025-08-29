/**
 * View -- .tsx
 * ViewModel -- Viewに公開するもの。Viewの状態や操作
 * Model -- Viewに依存しない処理
 * 依存方向：View → VM → Model
 * total が常に取得できる前提の設計
 * 連打に非対応（呼び元で制御必要）
 */

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
 */
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
  offset: number; // 実効オフセット（補正あり）
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
export async function createPager<TItems, TQuery>(
  fetcher: PageFetcher<TItems, TQuery>,
  param: { offset: number; limit: number; query: TQuery },
): Promise<Pager<TItems>> {
  const { query } = param;
  let { offset, limit } = param;

  offset = Math.max(OFFSET_START, Math.floor(offset));
  limit = Math.max(1, Math.floor(limit));

  const fetchData = async (): Promise<PagerResult<TItems>> => {
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

  const pager: Pager<TItems> = {
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
