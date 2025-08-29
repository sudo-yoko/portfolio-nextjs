/**
 * Node.js組み込みのテストランナーによるテスト
 * npm i -D tsx
 * package.json: "node:test": "node --test --import tsx '__tests__/node-test/offset-pager.test.ts'"
 * npm run node:test
 */
import {
  createPager,
  PageFetcher,
  PageFetcherResult,
  Pager,
} from '../../modules/(system)/pager/offset-pager';
import { send } from '../../modules/users/models/users-client';
import type { User, UsersQuery } from '../../modules/users/models/users-model';
import test from 'node:test';

test('aaa', async () => {
  const fetcher: PageFetcher<User[], UsersQuery> = async (offset, limit, query) => {
    const { total, users } = await send(offset, limit, query);

    const result: PageFetcherResult<User[]> = { total, items: users };
    return result;
  };

  const pager: Pager<User[]> = await createPager<User[], UsersQuery>(fetcher, {
    offset: 1,
    limit: 10,
    query: {},
  });

  console.log(`data=${JSON.stringify(await pager.current())}`);
  console.log(`data=${JSON.stringify(await pager.next())}`);
  console.log(`data=${JSON.stringify(await pager.prev())}`);
});
