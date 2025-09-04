import { Pager } from '@/modules/(system)/pager/models/pager-model';
import { createPager } from '@/modules/(system)/pager/offset-pager';
import { fetchAction } from '@/modules/users/models/fetch-action';
import { User, UsersQuery } from '@/modules/users/models/types';
import 'client-only';

export async function getPager(offset: number, limit: number, query: UsersQuery): Promise<Pager<User[]>> {
  const pager: Pager<User[]> = await createPager<User[], UsersQuery>(fetchAction, {
    offset,
    limit,
    query,
  });
  return pager;
}
