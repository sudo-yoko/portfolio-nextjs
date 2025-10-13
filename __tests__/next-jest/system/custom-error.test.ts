// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts
import { printf } from '@/__tests__/next-jest/_utils/test-logger';
import {
  actionError,
  authError,
  isActionError,
  isAuthError,
  isRouteError,
  routeError,
  validationError,
} from '@/presentation/(system)/error-handlers/custom-error';
import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import { ActionResult } from '@/presentation/(system)/types/action-result';
import { RouteResult } from '@/presentation/(system)/types/route-response';
import { Violations } from '@/presentation/(system)/validators/validator';
import { FormKeys } from '@/presentation/contact/mvvm/models/types';
import { User } from '@/presentation/users/min/modules/users-types';

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
  // e is string
  expect(isActionError(e)).toBe(false);
});

// ======================
// actionError Test
// ======================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test2-1'
test('test2-1', () => {
  const result = ActionResult.abort();
  const e = actionError(result);
  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test2-2'
test('test2-2', () => {
  const cause = '原因エラー';

  const result = ActionResult.abort(cause);
  const e = actionError(result);
  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test2-3'
test('test2-3', () => {
  const result = ActionResult.complete({});
  print(`result=${JSON.stringify(result)}`);

  const e = actionError(result);
  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test2-4'
test('test2-4', () => {
  const users: User[] = [{ userId: '12345', userName: 'test taro' }];
  const result = ActionResult.complete(users);
  print(`result=${JSON.stringify(result)}`);

  const e = actionError(result);
  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// ======================
// routeError Test
// ======================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test3-1'
test('test3-1', async () => {
  const body = RouteResult.abort();
  const resp: Response = new Response(JSON.stringify(body), { status: 500 });
  const e = await routeError(resp);
  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test3-2'
test('test3-2', async () => {
  const cause = '原因エラー';

  const body = RouteResult.abort(cause);
  const resp: Response = new Response(JSON.stringify(body), { status: 500 });
  const e = await routeError(resp);
  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// ======================
// validationError Test
// ======================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test4-1'
test('test4-1', () => {
  const violations: Violations<FormKeys> = {
    name: ['名前が長すぎます。', '名前が不正です。'],
    email: ['不正なメールアドレスです。'],
  };
  const e = validationError(violations);
  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});
