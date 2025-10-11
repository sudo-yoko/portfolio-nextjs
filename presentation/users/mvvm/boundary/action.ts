'use server';

import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/boundary-error-handler';
import { execute } from '@/presentation/users/mvvm/models/usecase';
import { UsersQuery } from '@/presentation/users/mvvm/models/users-types';

export async function action(offset: number, limit: number, query: UsersQuery) {
  return await withErrorHandlingAsync(() => func());

  async function func() {
    return await execute(offset, limit, query);
  }
}
