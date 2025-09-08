import { actionError } from '@/modules/(system)/error-handlers/action-error';
import { FetchPage } from '@/modules/(system)/pager/types';
import { action } from '@/modules/users/models/action';
import { User, UsersQuery } from '@/modules/users/models/types';
import 'client-only';

/**
 * Server Actionsを使ったデータフェッチ実装
 */
const fetchAction: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const result = await action(offset, limit, query);
  if (result.abort) {
    throw actionError();
  }
  const { total, items } = result.data;
  return { total, items };
};

/**
 * api Routeを使ったデータフェッチ実装
 */
const _fetchRoute: FetchPage<User[], UsersQuery> = async (_offset, _limit, _query) => {
  return { total: 0, items: [] };
};

export const fetch: FetchPage<User[], UsersQuery> = fetchAction;
