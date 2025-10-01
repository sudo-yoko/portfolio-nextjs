//
// ページネーションの型定義
//
import 'client-only'

/**
 * データ取得関数の関数シグネチャ
 */
export interface FetchPage<TItems, TQuery> {
  (offset: number, limit: number, query: TQuery): Promise<FetchPageResult<TItems>>;
}

/**
 * データ取得関数の戻り値の型
 */
export interface FetchPageResult<TItems> {
  total: number;
  items: TItems;
}

/**
 * ページャ関数の関数シグネチャ
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
 * ページャ関数の戻り値の型
 */
export interface PagerResult<T> {
  items: T;
  /**
   * 現在選択されているページ
   */
  currentPage: number;
  /**
   * 総件数
   */
  total: number;
  /**
   * 総ページ数
   */
  totalPages: number;
  /**
   * 実効オフセット（補正あり）
   */
  offset: number;
  /**
   * 次ページがあるか
   */
  hasNext: boolean;
  /**
   * 前ページがあるか
   */
  hasPrev: boolean;
}
