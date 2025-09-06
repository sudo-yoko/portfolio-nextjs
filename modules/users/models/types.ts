/**
 * 入力フォームのキー。
 * 検索条件のユーザー名
 */
export type InputName = 'userName';

/**
 * 検索条件
 */
export type UsersQuery = {
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

/**
 * ユーザーリスト
 */
export type Users = {
  total: number;
  users: User[];
};
