/**
 * 検索条件
 */
export type UsersQuery = {
  offset: number;
  limit: number;
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
  users: User[];
};
