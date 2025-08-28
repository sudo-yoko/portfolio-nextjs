import { PageFetcher } from '@/modules/(system)/pager/offset-pager';
import { Users, UsersQuery } from '@/modules/users/models/users-model';
import { send } from './users-client';

const logPrefix = "users-pager.ts: ";

const usersFetcher: PageFetcher<Users, UsersQuery> = async (
  offset,
  limit,
  query,
): Promise<Users> => {
    console.log(logPrefix + `offset=${offset}`);
    console.log(logPrefix + `limit=${limit}`);
    console.log(logPrefix + `query=${JSON.stringify(query)}`);

    const res = await send(query);
    return 
};
