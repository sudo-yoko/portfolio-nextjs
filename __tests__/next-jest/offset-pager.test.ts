import { createPager, PageFetcher, PageFetcherResult, Pager } from '@/modules/(system)/pager/offset-pager';
import { send } from '@/modules/users/models/users-client';
import type { User, UsersQuery } from '@/modules/users/models/users-model';
import { printf } from './utils/test-logger';

const print = printf({ logPrefix: '>>> [offset-pager.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/offset-pager.test.ts
test('test1', async () => {
  const fetcher: PageFetcher<User[], UsersQuery> = async (offset, limit, query) => {
    print(`parameter -> offset=${offset}`);
    print(`parameter -> limit=${limit}`);
    print(`parameter -> query=${JSON.stringify(query)}`);

    const resp = await send(offset, limit, query);
    const result: PageFetcherResult<User[]> = { total: resp.total, items: { ...resp.users } };
    return result;
  };

  const pager: Pager<User[]> = await createPager<User[], UsersQuery>(fetcher, {
    offset: 1,
    limit: 1,
    query: { userName: 'taro' },
  });
  print(`result -> data=${JSON.stringify(await pager.current())}`);
  print(`result -> data=${JSON.stringify(await pager.next())}`);
  print(`result -> data=${JSON.stringify(await pager.prev())}`);
});
