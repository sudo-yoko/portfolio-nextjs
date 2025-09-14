import { actionError, routeError } from '@/modules/(system)/error-handlers/custom-error';
import { logError } from '@/modules/(system)/loggers/logger-client';
import { FetchPage, FetchPageResult } from '@/modules/(system)/pager/types';
import { Aborted, RouteResult } from '@/modules/(system)/types/route-response';
import { action } from '@/modules/users/models/users-action';
import { User, UsersQuery } from '@/modules/users/models/users-types';
import 'client-only';

/**
 * Server Actions を使ったデータフェッチ実装
 */
const fetchAction: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const result = await action(offset, limit, query);
  if (result.abort) {
    throw actionError(result);
  }
  const { total, items } = result.data;
  return { total, items };
};

/**
 * Route Handlers を使ったデータフェッチ実装
 */
const _fetchRoute: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const res = await window.fetch('api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset, limit, query }),
  });
  if (res.status != 200) {
    //logError(`status=${res.status}, body=${JSON.stringify(await res.json())}`);
    throw await routeError(res);
  }
  const body: FetchPageResult<User[]> = await res.json();
  const { total, items } = body;
  return { total, items };
};

export const fetch: FetchPage<User[], UsersQuery> = fetchAction;
