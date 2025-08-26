/**
 * 検索条件
 */
export type Query = {
  userId?: string;
  userName?: string;
};

/**
 * ユーザー情報
 */
export type User = {
  userId: string;
  userName: string;
};
