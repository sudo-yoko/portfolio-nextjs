/**
 * クエリパラメータ
 */
export type ContactParams = {
  category?: string;
  from?: string;
};

/**
 * お問い合わせ内容
 */
export type ContactBody = {
  name: string;
  email: string;
  body: string;
};
