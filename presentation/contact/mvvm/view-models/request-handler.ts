import logger from '@/presentation/(system)/logging-facade/logger';
import { getQueryParams, SearchParams } from '@/presentation/(system)/types/search-params';
import { ContactParams } from '@/presentation/contact/mvvm/models/contact2-types';
import 'server-only';

const logPrefix = '/contact/mvvm/view-models/request-handler.ts: ';

export async function handleRequest(props: { searchParams?: SearchParams }): Promise<ContactParams> {
  // クエリパラメータを取得する
  const params: ContactParams = await getQueryParams(props.searchParams, 'category', 'from');
  logger.info(logPrefix + `category=${params.category}, from=${params.from}`);
  return params;
}
