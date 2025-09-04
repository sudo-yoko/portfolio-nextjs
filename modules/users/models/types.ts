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

export type Users = {
  total: number;
  users: User[];
};
