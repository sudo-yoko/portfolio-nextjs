import { createPager } from '@/modules/(system)/pagination/min/models/pager';
import { FetchPage, FetchPageResult, Pager } from '@/modules/(system)/pagination/min/models/types';
import { send } from '@/modules/users/min/models/users-client';
import type { User, UsersQuery } from '@/modules/users/min/models/users-types';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [offset-pager.test.ts]', stdout: true });

// npm run mock5
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/offset-pager.test.ts
test('test1', async () => {
  const fetcher: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
    print(`parameter -> offset=${offset}`);
    print(`parameter -> limit=${limit}`);
    print(`parameter -> query=${JSON.stringify(query)}`);

    const { total, users } = await send(offset, limit, query);
    const result: FetchPageResult<User[]> = { total, items: users };
    return result;
  };

  const pager: Pager<User[]> = createPager<User[], UsersQuery>(fetcher, {
    initialPage: 0,
    perPage: 2,
    query: { userName: 'taro' },
  });
  print(`result -> data=${JSON.stringify(await pager.current())}`);
  print(`result -> data=${JSON.stringify(await pager.next())}`);
  print(`result -> data=${JSON.stringify(await pager.prev())}`);
});
