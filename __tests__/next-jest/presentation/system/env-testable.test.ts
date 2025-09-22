import { printf } from '@/__tests__/next-jest/_utils/test-logger';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [env-testable.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/env-testable.test.ts -t 'test1-1'
test('test1-1', async () => {
  const mocked = '@/presentation/(system)/env/env-testable';

  // モックを作成
  jest.unstable_mockModule(mocked, () => ({
    __esModule: true,
    envByStaticKey: {
      get NODE_ENV() {
        return 'production';
      },
      get NEXT_PUBLIC_DEBUG_LOGGER() {
        return 'true';
      },
    },
  }));

  // モック後にimport
  const { envByStaticKey: env } = await import(mocked);

  print(env.NODE_ENV);
  print(env.NEXT_PUBLIC_DEBUG_LOGGER);
});
