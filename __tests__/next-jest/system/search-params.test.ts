import { getQueryParams, SearchParam, SearchParams } from '@/modules/(system)/types/search-params';
import { printf } from '../_utils/test-logger';

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/search-params.test.ts
const print = printf({ logPrefix: '>>> [search-params.test.ts]', stdout: true });

test('test', async () => {
  const param1: SearchParam = 'param1';
  const param2: SearchParam = ['param2-1', 'param2-2'];
  const param3: SearchParam = undefined;
  const searchParams: SearchParams = Promise.resolve({ param1, param2, param3 });
  print(`Parameter -> SearchParams=${JSON.stringify(await searchParams)}`);

  //const paramsKeys: string[] = ['param2', 'param3'] as const; // as constを付けるとリテラル型推論が効く
  //print(`Parameter -> targetKeys=${JSON.stringify(paramsKeys)}`);

  const result = await getQueryParams(searchParams, 'param2', 'param3');
  print(`Result -> ${JSON.stringify(result)}`);
  print(`Result -> param2=[${result.param2}], param3=[${result.param3}]`);
});
