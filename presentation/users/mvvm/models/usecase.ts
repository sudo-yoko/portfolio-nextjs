import { FetchPageResult } from '@/presentation/(system)/pagination/mvvm/models/types';
import { BoundaryResult, ok } from '@/presentation/(system)/types/boundary-result';
import { send } from '@/presentation/users/mvvm/bff/users-client';
import { User, UsersQuery } from '@/presentation/users/mvvm/models/users-types';
import 'server-only';

export async function execute(
  offset: number,
  limit: number,
  query: UsersQuery,
): Promise<BoundaryResult<FetchPageResult<User[]>>> {
  const { total, users } = await send(offset, limit, query);
  const data: FetchPageResult<User[]> = { items: users, total };
  return ok(data);
}
