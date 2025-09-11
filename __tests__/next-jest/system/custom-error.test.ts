// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts

import {
  actionError,
  authError,
  isActionError,
  isAuthError,
  isRouteError,
  routeError,
} from '@/modules/(system)/error-handlers/custom-error';

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test1'
test('test1', () => {
  const e = actionError();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(true);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(false);
});

test('test2', () => {
  const e = authError();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(true);
  expect(isRouteError(e)).toBe(false);
});

test('test3', () => {
  const e = routeError();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(true);
});

test('test4', () => {
  const e = new Error();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(false);
});
