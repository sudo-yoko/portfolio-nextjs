import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/server-error-handler';
import logger from '@/presentation/(system)/logging-facade/logger';
import { getQueryParams, SearchParams } from '@/presentation/(system)/types/search-params';
import { ContactParams } from '@/presentation/contact/mvvm/models/contact2-types';
import 'server-only';

const logPrefix = 'contact2-page-request-handler.ts: ';

/**
 * サーバーサイド処理
 */
export const handleRequest = async (searchParams?: SearchParams) => {
  // エラーハンドリングを追加して処理を実行する。
  await withErrorHandlingAsync(() => func());

  async function func() {
    // クエリパラメータを取得する
    const params: ContactParams = await getQueryParams(searchParams, 'category', 'from');
    logger.info(logPrefix + `category=${params.category}, from=${params.from}`);
  }
};
