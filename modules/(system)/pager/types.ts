import { ActionResult } from '../models/action-result';

/**
 * Pager サーバーアクション関数の型
 */
export type PagerAction<TItems, TQuery> = (
  offset: number,
  limit: number,
  query: TQuery,
) => Promise<ActionResult<PagerActionResult<TItems>>>;

/**
 * Pager サーバーアクション関数の戻り値の型
 */
export type PagerActionResult<TItems> = {
  total: number;
  items: TItems;
};

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
  page: number;
  total: number;
  totalPage: number;
  offset: number; // 実効オフセット（補正あり）
  hasNext: boolean;
  hasPrev: boolean;
};
