import 'server-only';

import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/server-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import {
  SearchParam,
  SearchParams,
} from '@/modules/(system)/types/search-params';

const logPrefix = 'app/contact2/page.ts: ';

/**
 * サーバーサイド処理
 */
export const serverProcess = async (searchParams?: SearchParams) => {
  // エラーハンドリングを追加して処理を実行する。
  await withErrorHandlingAsync(() => applyServerProcess());

  async function applyServerProcess() {
    const params = await searchParams;
    logger.info(logPrefix + `searchParams=${JSON.stringify(params)}`);

    const para1: SearchParam = params?.['para1'];
    const para2: SearchParam = params?.['para2'];
    logger.info(logPrefix + `para1=${para1}, para2=${para2}`);
  }
};
