import { printf } from '@/__tests__/next-jest/_utils/test-logger';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [logging.core.winston.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/logging/logging.core.winston.test.ts -t 'test1-1'
test('test1-1', async () => {
  const mocked = '@/presentation/(system)/env/env-testable.s';

  // モックを作成
  jest.unstable_mockModule(mocked, () => ({
    __esModule: true,
    envByStaticKey: {
      get NODE_ENV() {
        return 'test';
        // return 'production';
      },
    },
    envByDynamicKey: (key: string) => {
      return key;
    },
  }));

  // モック後にimport
  const logger = (await import('@/presentation/(system)/logging/logging.core.winston')).default;

  print('start');
  logger.info('logger test', { extra1: '1', extra2: '2', extra3: '3', extra4: '4', extra5: '5' });
  logger.info('logger test');
  print('end');
});
