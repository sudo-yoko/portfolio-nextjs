import { printf } from '@/__tests__/next-jest/_utils/test-logger';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [logger-debug.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/logger-debug.test.ts -t 'test1-1'
test('test1-1', async () => {
  jest.unstable_mockModule('@/presentation/(system)/env/env-testable', () => ({
    __esModules: true,
    envByStaticKey: {
      get NODE_ENV() {
        return 'production';
      },
      get NEXT_PUBLIC_DEBUG_LOGGER() {
        // return undefined;
        return 'true';
      },
    },
  }));

  const debug = (await import('@/presentation/(system)/loggers/logger-debug')).default;

  print('start');
  debug('debug');
  print('end');
});
