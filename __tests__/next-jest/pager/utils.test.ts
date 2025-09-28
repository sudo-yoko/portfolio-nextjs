import { calcPagination } from '@/presentation/(system)/pagination/min/modules/utils';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [pager/utils.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/pager/utils.test.ts -t 'calcPagination1'
test('calcPagination1', () => {
  const offset = 19;
  const limit = 10;
  const total = 20;
  print(`Parameter -> offset=${offset}, limit=${limit}, total=${total}`);

  const result = calcPagination(offset, limit, total);
  print(`Result -> ${JSON.stringify(result)}`);
});
