import { printf } from '@/__tests__/next-jest/_utils/test-logger';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [logger-winston.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/logger-winston.test.ts -t 'test1-1'
test('test1-1', async () => {
  const mocked = '@/presentation/(system)/env/env-testable.s';

  // モックを作成
  jest.unstable_mockModule(mocked, () => ({
    __esModule: true,
    envByStaticKey: {
      get NODE_ENV() {
        return 'test';
      },
    },
    envByDynamicKey: (key: string) => {
      return key;
    },
  }));

  // モック後にimport
  const logger = (await import('@/presentation/(system)/loggers/logger-winston')).default;

  print('start');
  logger.info('test');
  print('end');
});
