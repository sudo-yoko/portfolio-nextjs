'use server';

import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/action-error-handler';
import { FetchPageResult } from '@/modules/(system)/pager/types';
import { send } from '@/modules/users/models/sender';
import { User, UsersQuery } from '@/modules/users/models/types';

export async function action(offset: number, limit: number, query: UsersQuery) {
  return await withErrorHandlingAsync(() => action());

  async function action() {
    const { total, users } = await send(offset, limit, query);
    const result: FetchPageResult<User[]> = { total, items: users };
    return result;
  }
}
