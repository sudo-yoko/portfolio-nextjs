import { SearchParam } from '@/modules/(system)/types/search-params';

/**
 * クエリパラメータ
 */
export type ContactParams = {
  category?: SearchParam;
  from?: SearchParam;
};

/**
 * 入力フォームのキー
 * お名前、メールアドレス、お問い合わせ内容
 */
export type FormKeys = 'name' | 'email' | 'body';

/**
 * お問い合わせ入力内容
 */
export type ContactBody = {
  name: string;
  email: string;
  body: string;
};
