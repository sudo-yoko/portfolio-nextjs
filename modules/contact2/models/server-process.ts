import 'server-only';

import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/server-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import {
  getQueryParam,
  SearchParams,
} from '@/modules/(system)/models/search-params';
import { ContactParams } from '@/modules/contact2/models/contact-model';

const logPrefix = 'app/contact2/page.ts: ';

/**
 * サーバーサイド処理
 */
export const serverProcess = async (searchParams?: SearchParams) => {
  // エラーハンドリングを追加して処理を実行する。
  await withErrorHandlingAsync(() => serverProcess());

  async function serverProcess() {
    // クエリパラメータを取得する
    const params: ContactParams = await getQueryParam(
      ['category', 'from'],
      searchParams,
    );
    logger.info(logPrefix + `category=${params.category}, from=${params.from}`);
  }
};
