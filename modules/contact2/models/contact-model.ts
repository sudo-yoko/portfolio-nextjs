/**
 * クエリパラメータ
 */
export type ContactParams = {
  category?: string;
  from?: string;
};

/**
 * お問い合わせ入力内容
 */
export type ContactBody = {
  name: string;
  email: string;
  body: string;
};
