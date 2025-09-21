/**
 * URLクエリ文字列の型定義
 */
export type SearchParam = string | string[] | undefined;

/**
 * URLクエリ文字列の集合を扱うオブジェクトの型定義
 */
export type SearchParams = Promise<{ [key: string]: SearchParam }>;

/**
 * URLクエリ文字列から、指定したクエリパラメータを取得する
 *
 * @param keys - 取得するパラメータ名をstring配列で指定する。
 * @param searchParams -
 */
export async function getQueryParams<K extends string>(
  searchParams?: SearchParams,
  ...keys: readonly K[] // readonlyにすることで、呼び元でas constを付けた場合にリテラル型推論が効く。
): Promise<{ [P in K]: SearchParam }> {
  const params = await searchParams;
  const result = {} as { [key in K]: SearchParam };
  for (const key of keys) {
    result[key] = params?.[key];
  }
  return result;
}
