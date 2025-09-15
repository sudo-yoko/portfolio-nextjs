/**
 * ページデータ取得インターフェース。関数の型
 */
export type FetchPage<TItems, TQuery> = (
  offset: number,
  limit: number,
  query: TQuery,
) => Promise<FetchPageResult<TItems>>;

/**
 * ページデータ取得インターフェース。関数の戻り値の型
 */
export type FetchPageResult<TItems> = {
  total: number;
  items: TItems;
};

/*
export type PagerAction<TItems, TQuery> = (
  offset: number,
  limit: number,
  query: TQuery,
) => Promise<ActionResult<PagerActionResult<TItems>> | ActionResult<void>>;

export type PagerActionResult<TItems> = {
  total: number;
  items: TItems;
};
*/

/**
 * ページング制御オブジェクト
 *
 * 検索条件や表示件数などはPagerの中にエンクロージングされる
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
  items: T;
  /**
   * 現在選択されているページ
   */
  page: number;
  /**
   * 総件数
   */
  total: number;
  /**
   * 総ページ数
   */
  totalPage: number;
  /**
   * 実効オフセット（補正あり）
   */
  offset: number;
  hasNext: boolean;
  hasPrev: boolean;
};
