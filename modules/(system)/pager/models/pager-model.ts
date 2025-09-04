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