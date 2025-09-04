import { PageFetcherResult } from '@/modules/(system)/pager/models/pager-model';
import { send } from '@/modules/users/models/client';
import { User, UsersQuery } from '@/modules/users/models/types';
import 'server-only';

export async function fetch(offset: number, limit: number, query: UsersQuery) {
  const { total, users } = await send(offset, limit, query);
  const result: PageFetcherResult<User[]> = { total, items: users };
  return result;
}
