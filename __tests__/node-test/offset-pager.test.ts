/**
 * Node.js 組み込みテストランナーによるテスト
 *
 * インストール
 * npm i -D tsx
 * 
 * テスト実行
 * package.json: "node:test": "node --test --import tsx '__tests__/node-test/offset-pager.test.ts'"
 * npm run node:test
 * もしくは
 * npm exec -- node --test --import tsx __tests__/node-test/offset-pager.test.ts
 */
import {
  createPager,
  PageFetcher,
  PageFetcherResult,
  Pager,
} from '@/modules/(system)/pager/offset-pager';
import type { User, UsersQuery } from '@/modules/users/models/users-model';
import test from 'node:test';

const consolePrefix = '### test: offset-pager.test.ts >>> ';

test('test: offset-pager.test.ts', async () => {
  const fetcher: PageFetcher<User[], UsersQuery> = async (offset, limit, query) => {
    console.log(consolePrefix + `parameter -> offset=${offset}`);
    console.log(consolePrefix + `parameter -> limit=${limit}`);
    console.log(consolePrefix + `parameter -> query=${JSON.stringify(query)}`);

    const items: User[] = [
      { userId: '1', userName: '111' },
      { userId: '2', userName: '222' },
    ];
    const result: PageFetcherResult<User[]> = { total: 1, items };
    return result;
  };

  const pager: Pager<User[]> = await createPager<User[], UsersQuery>(fetcher, {
    offset: 1,
    limit: 1,
    query: { userName: 'taro' },
  });

  console.log(consolePrefix + `result -> data=${JSON.stringify(await pager.current())}`);
  console.log(consolePrefix + `result -> data=${JSON.stringify(await pager.next())}`);
  console.log(consolePrefix + `result -> data=${JSON.stringify(await pager.prev())}`);
});
