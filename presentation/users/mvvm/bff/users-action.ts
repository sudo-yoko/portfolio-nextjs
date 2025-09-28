'use server';

import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/action-error-handler';
import { FetchPageResult } from '@/presentation/(system)/pagination/mvvm/models/types';
import { send } from '@/presentation/users/mvvm/bff/users-client';
import { User, UsersQuery } from '@/presentation/users/mvvm/models/users-types';

export async function action(offset: number, limit: number, query: UsersQuery) {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const { total, users } = await send(offset, limit, query);
    const result: FetchPageResult<User[]> = { total, items: users };
    return result;
  }
}
