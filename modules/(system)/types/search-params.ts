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
 */
export async function getQueryParam<K extends string>(
  keys: K[],
  searchParams?: SearchParams,
): Promise<{ [P in K]: string | undefined }> {
  const params = await searchParams;
  const result = {} as { [P in K]: string | undefined };

  for (const key of keys) {
    const value = params?.[key];
    result[key] = Array.isArray(value) ? value[0] : value;
  }
  return result;
}
