/**
 * npm exec -- node --test --experimental-test-module-mocks --import tsx __tests__/node-test/logger.test.ts
 * npm exec -- tsx --test --experimental-test-module-mocks --import tsx __tests__/node-test/logger.test.ts
 * package.jsonに "type": "module", を追加必要
 */

import test from 'node:test';

test('logger test', async (t) => {
  // server-onlyをモックする
  t.mock.module('server-only', { defaultExport: {}, namedExports: {} });
  const logger = (await import('../../modules/(system)/logging-facade/logger')).default;

  logger.info('aaaaaaaaaa');
});
