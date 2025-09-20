// テスト実行
// npm exec -- node --test --import tsx __tests__/node-test/offset-pager.test.ts

import { createPager } from '@/modules/(system)/pagination/min/models/pager';
import { FetchPage, FetchPageResult, Pager } from '@/modules/(system)/pagination/min/models/types';
import type { User, UsersQuery } from '@/modules/users/min/models/users-types';
import test from 'node:test';

const consolePrefix = '### test: offset-pager.test.ts >>> ';

test('test: offset-pager.test.ts', async () => {
  const fetcher: FetchPage<User[], UsersQuery> = async (offset, limit, query) => {
    console.log(consolePrefix + `parameter -> offset=${offset}`);
    console.log(consolePrefix + `parameter -> limit=${limit}`);
    console.log(consolePrefix + `parameter -> query=${JSON.stringify(query)}`);

    const items: User[] = [
      { userId: '1', userName: '111' },
      { userId: '2', userName: '222' },
    ];
    const result: FetchPageResult<User[]> = { total: 1, items };
    return result;
  };

  const pager: Pager<User[]> = createPager<User[], UsersQuery>(fetcher, {
    initialPage: 1,
    perPage: 1,
    query: { userName: 'taro' },
  });

  console.log(consolePrefix + `result -> data=${JSON.stringify(await pager.current())}`);
  console.log(consolePrefix + `result -> data=${JSON.stringify(await pager.next())}`);
  console.log(consolePrefix + `result -> data=${JSON.stringify(await pager.prev())}`);
});
