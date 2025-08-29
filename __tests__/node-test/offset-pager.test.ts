/**
 * Node.js 組み込みのテストランナーによるテスト
 *
 * npm i -D tsx
 * package.json: "node:test": "node --test --import tsx '__tests__/node-test/offset-pager.test.ts'"
 *
 * テスト実行方法
 * ターミナルを２つ立ち上げて、一方で npm run mock5、もう一方で npm run node:test を実行する。
 */
import { client } from '@/modules/(system)/clients/client';
import {
  createPager,
  PageFetcher,
  PageFetcherResult,
  Pager,
} from '@/modules/(system)/pager/offset-pager';
import type { User, UsersQuery } from '@/modules/users/models/users-model';
import test from 'node:test';

const consolePrefix = "### test: offset-pager.test.ts >>> "

test('test: offset-pager.test.ts', async () => {
  type Res = {
    total: number;
    users: {
      userId: string;
      userName: string;
    }[];
  };
  const fetcher: PageFetcher<User[], UsersQuery> = async (offset, limit, query) => {
    const res = await client.get<Res>('http://localhost:3003/users', {
      params: { offset, limit, ...query },
    });
    const { total, users } = res.data;
    return  { total, items: users };
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
