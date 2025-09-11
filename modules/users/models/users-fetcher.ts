import { actionError } from '@/modules/(system)/error-handlers/custom-error';
import { FetchPage } from '@/modules/(system)/pager/types';
import { action } from '@/modules/users/models/users-action';
import { User, UsersQuery } from '@/modules/users/models/users-types';
import 'client-only';

/**
 * Server Actions を使ったデータフェッチ実装
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
 * Route Handlers を使ったデータフェッチ実装
 */
const _fetchRoute: FetchPage<User[], UsersQuery> = async (_offset, _limit, _query) => {
  return { total: 0, items: [] };
};

export const fetch: FetchPage<User[], UsersQuery> = fetchAction;
