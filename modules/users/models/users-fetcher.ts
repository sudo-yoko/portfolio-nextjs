import { actionError, routeError } from '@/modules/(system)/error-handlers/custom-error';
import { FetchPage, FetchPageResult } from '@/modules/(system)/pager/types';
import { action } from '@/modules/users/models/users-action';
import { User, UsersQuery } from '@/modules/users/models/users-types';
import 'client-only';

/**
 * Server Actions を使ったデータフェッチ実装
 */
const _fetchAction: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
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
const fetchRoute: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const res = await window.fetch('api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset, limit, query }),
  });
  if (!res.ok) {
    throw routeError();
  }
  const body: FetchPageResult<User[]> = await res.json();
  const { total, items } = body;
  return { total, items };
};

export const fetch: FetchPage<User[], UsersQuery> = fetchRoute;
