import { SearchParam } from '@/modules/(system)/models/search-params';

/**
 * クエリパラメータ
 */
export type ContactParams = {
  category?: SearchParam;
  from?: SearchParam;
};

/**
 * お問い合わせ入力内容
 */
export type ContactBody = {
  name: string;
  email: string;
  body: string;
};
