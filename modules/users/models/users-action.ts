'use server';

import { withAuthAsync } from '@/modules/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/action-error-handler';
import { FetchPageResult } from '@/modules/(system)/pager/types';
import { send } from '@/modules/users/models/users-client';
import { User, UsersQuery } from '@/modules/users/models/users-types';

export async function action(offset: number, limit: number, query: UsersQuery) {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const { total, users } = await send(offset, limit, query);
    const result: FetchPageResult<User[]> = { total, items: users };
    return result;
  }
}
