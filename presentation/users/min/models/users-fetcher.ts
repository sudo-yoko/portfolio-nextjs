import { actionError, routeError } from '@/presentation/(system)/error-handlers/custom-error';
import { FetchPage, FetchPageResult } from '@/presentation/(system)/pagination/min/models/types';
import { action } from '@/presentation/users/min/models/users-action';
import { User, UsersQuery } from '@/presentation/users/min/models/users-types';
import 'client-only';

/**
 * Server Actions を使ったデータフェッチ実装
 */
const _fetchAction: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const result = await action(offset, limit, query);
  if (result.abort) {
    throw actionError(result);
  }
  return result.data;
};

/**
 * Route Handlers を使ったデータフェッチ実装
 */
const fetchRoute: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const url = 'http://localhost:3000/api/users';
  const res = await window.fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset, limit, query }),
  });
  if (res.status != 200) {
    throw await routeError(res, { method: 'POST', route: url });
  }
  const body: FetchPageResult<User[]> = await res.json();
  return body;
};

export const fetch: FetchPage<User[], UsersQuery> = fetchRoute;
