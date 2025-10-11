import { CONTENT_TYPE_APPLICATION_JSON_UTF8, POST } from '@/presentation/(system)/clients/constants';
import { boundaryError } from '@/presentation/(system)/error-handlers/custom-error';
import { FetchPage, FetchPageResult } from '@/presentation/(system)/pagination/mvvm/models/types';
import { isOk, parseBoundaryResult } from '@/presentation/(system)/types/boundary-result';
import { action } from '@/presentation/users/mvvm/boundary/action';
import { User, UsersQuery } from '@/presentation/users/mvvm/models/users-types';
import 'client-only';

/**
 * Server Actions を使ったデータフェッチ実装
 */
const _viaAction: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const result = await action(offset, limit, query);
  if (isOk(result)) {
    return result;
  }
  throw boundaryError(JSON.stringify(result));
};

/**
 * Route Handlers を使ったデータフェッチ実装
 */
const viaRoute: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const url = '/api/users/mvvm';
  const res = await window.fetch(url, {
    method: POST,
    headers: CONTENT_TYPE_APPLICATION_JSON_UTF8,
    body: JSON.stringify({ offset, limit, query }),
  });
  if (res.status === 200) {
    const clone = res.clone();
    const text = await clone.text();
    const parsed = parseBoundaryResult<FetchPageResult<User[]>, never>(text);
    if (parsed !== null) {
      if (isOk(parsed)) {
        return parsed;
      }
    }
  }
  const text = await res.text();
  throw boundaryError(text);
};

export const fetchPage: FetchPage<User[], UsersQuery> = viaRoute;
