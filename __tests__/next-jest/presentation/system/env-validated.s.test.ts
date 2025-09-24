import { printf } from '@/__tests__/next-jest/_utils/test-logger';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [env-validated.s.test.ts]', stdout: true });
const mockedEnv = '@/presentation/(system)/env/env-testable.s';
const mockedLogger = '@/presentation/(system)/logging-facade/logger';

// ==========================
// env test
// ==========================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/env-validated.s.test.ts -t 'test1-1'
test('test1-1', async () => {
  // loggerをモック
  jest.unstable_mockModule(mockedLogger, () => ({
    default: {
      error: (msg: string) => {
        print('mocked logger: ' + msg);
      },
    },
  }));
  // env関数をモック
  jest.unstable_mockModule(mockedEnv, () => ({
    envByDynamicKey: (_key: string) => {
      return undefined;
    },
  }));
  const { env } = await import('@/presentation/(system)/env/env-validated.s');
  print('start');
  expect(() => env('test')).toThrow(Error);
  print('end');
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/env-validated.s.test.ts -t 'test1-2'
test('test1-2', async () => {
  jest.unstable_mockModule(mockedEnv, () => ({
    envByStaticKey: {
      get NODE_ENV() {
        return 'development';
      },
    },
    envByDynamicKey: (_key: string) => {
      return 'OK';
    },
  }));
  const { env } = await import('@/presentation/(system)/env/env-validated.s');
  expect(env('test')).toBe('OK');
});

// ==========================
// envNumber test
// ==========================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/env-validated.s.test.ts -t 'test2-1'
test('test2-1', async () => {
  jest.unstable_mockModule(mockedEnv, () => ({
    envByStaticKey: {
      get NODE_ENV() {
        return 'development';
      },
    },
    envByDynamicKey: (_key: string) => {
      return undefined;
    },
  }));
  const { envNumber } = await import('@/presentation/(system)/env/env-validated.s');
  expect(() => envNumber('test')).toThrow(Error);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/env-validated.s.test.ts -t 'test2-2'
test('test2-2', async () => {
  jest.unstable_mockModule(mockedEnv, () => ({
    envByStaticKey: {
      get NODE_ENV() {
        return 'development';
      },
    },
    envByDynamicKey: (_key: string) => {
      return 'AAA';
    },
  }));
  const { envNumber } = await import('@/presentation/(system)/env/env-validated.s');
  expect(() => envNumber('test')).toThrow(Error);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/env-validated.s.test.ts -t 'test2-3'
test('test2-3', async () => {
  jest.unstable_mockModule(mockedEnv, () => ({
    envByStaticKey: {
      get NODE_ENV() {
        return 'development';
      },
    },
    envByDynamicKey: (_key: string) => {
      return '123';
    },
  }));
  const { envNumber } = await import('@/presentation/(system)/env/env-validated.s');
  expect(envNumber('test')).toBe(123);
});
