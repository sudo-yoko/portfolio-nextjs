// Recordを使った実装

/**
 * URLクエリ文字列の型定義
 */
export type SearchParam = string | string[] | undefined;

/**
 * URLクエリ文字列の集合を扱うオブジェクトの型定義
 */
export type SearchParams = Promise<Record<string, SearchParam>>;

/**
 * URLクエリ文字列から、指定したクエリパラメータを取得する
 *
 * @param keys - 取得するパラメータ名をstring配列で指定する。
 * @param searchParams -
 */
export async function getQueryParams<K extends string>(
  searchParams?: SearchParams,
  ...keys: readonly K[] // readonlyにすることで、呼び元でas constを付けた場合にリテラル型推論が効く。
): Promise<Record<K, SearchParam>> {
  const params = await searchParams;
  const result = Object.fromEntries(keys.map((key) => [key, params?.[key]]));
  return result as Record<K, SearchParam>;
}
