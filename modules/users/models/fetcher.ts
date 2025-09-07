import { actionError } from '@/modules/(system)/error-handlers/action-error';
import { FetchPage } from '@/modules/(system)/pager/types';
import { action } from '@/modules/users/models/action';
import { User, UsersQuery } from '@/modules/users/models/types';
import 'client-only';

export const fetch: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
  const result = await action(offset, limit, query);
  if (result.abort) {
    throw actionError();
  }
  const { total, items } = result.result;
  return { total, items };
};
