// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts

import {
  actionError,
  authError,
  isActionError,
  isAuthError,
  isRouteError,
  routeError,
} from '@/modules/(system)/error-handlers/custom-error';
import { stringify } from '@/modules/(system)/error-handlers/error-handling-utils';
import { ActionResult } from '@/modules/(system)/types/action-result';
import { RouteResult } from '@/modules/(system)/types/route-response';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [custom-error.test.test.ts]', stdout: true });

// ======================
// isErrorOf Test
// ======================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test1-1'
test('test1-1', () => {
  const result = ActionResult.abort();
  const e = actionError(result);
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(true);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(false);
  const { message, representation } = stringify(e);
  print(`message=${message}, representation=${representation}`);
});

test('test1-2', () => {
  const e = authError();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(true);
  expect(isRouteError(e)).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test1-3'
test('test1-3', async () => {
  const body = RouteResult.abort();
  const resp: Response = new Response(JSON.stringify({ body }), { status: 500 });
  const e = await routeError(resp);
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(true);
});

test('test1-4', () => {
  const e = new Error();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test1-5'
test('test1-5', () => {
  try {
    const result = ActionResult.abort();
    throw actionError(result);
  } catch (e) {
    // e is unknown
    expect(isActionError(e)).toBe(true);
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test1-6'
test('test1-6', () => {
  const e = new String('test');
  expect(isActionError(e)).toBe(false);
});

// ======================
// ActionError Test
// ======================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test2-1'
test('test2-1', () => {
  const result = ActionResult.abort();
  const e = actionError(result);
  const { message, representation } = stringify(e);
  print(`message=${message}, representation=${representation}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test2-2'
test('test2-2', () => {
  const cause = '原因エラー';

  const result = ActionResult.abort(cause);
  const e = actionError(result);
  const { message, representation } = stringify(e);
  print(`message=${message}, representation=${representation}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test2-3'
test('test2-3', () => {
  const result = ActionResult.complete({});
  print(`result=${JSON.stringify(result)}`);

  const e = actionError(result);
  const { message, representation } = stringify(e);
  print(`message=${message}, representation=${representation}`);
});
