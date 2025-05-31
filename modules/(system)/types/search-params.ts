/**
 * URLクエリ文字列の型定義
 */
export type SearchParam = string | string[] | undefined;

/**
 * URLクエリ文字列の集合を扱うオブジェクトの型定義
 */
export type SearchParams = Promise<{ [key: string]: SearchParam }>;
