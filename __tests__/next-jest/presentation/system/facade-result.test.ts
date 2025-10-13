import { Ok, OkData, RejectViolation } from '@/presentation/(system)/types/facade-result';
import { Violations } from '@/presentation/(system)/validators/validator';
import { FormKeys } from '@/presentation/contact/mvvm/models/types';
import { User } from '@/presentation/users/mvvm/models/users-types';

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/facade-result.test.ts -t 'test1-1'
test('test1-1', () => {
  // const ok: Ok = { tag: 'ok' };
  // const facadeResult: FacadeResult = ok;
  // expect(facadeResult.tag).toBe('ok');
  const facadeResult: Ok = { tag: 'ok' };
  expect(facadeResult.tag).toBe('ok');
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/facade-result.test.ts -t 'test1-2'
test('test1-2', () => {
  const user: User = { userId: '12345', userName: 'taro' };
  // const okData: OkData<User> = { tag: 'okData', data: user };
  // const facadeResult: FacadeResult<User> = okData;
  // expect(facadeResult.tag).toBe('okData');
  const facadeResult: OkData<User> = { tag: 'ok', data: user };
  expect(facadeResult.tag).toBe('ok');
  expect(facadeResult.data).toBe(user);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/facade-result.test.ts -t 'test1-3'
test('test1-3', () => {
  const violations: Violations<FormKeys> = { name: ['ユーザー名を入力してください。'] };
  // const validationError: RejectViolation<Violations<FormKeys>> = {
  // tag: 'reject',
  // kind: 'violation',
  // violations,
  // };
  // const facadeResult: FacadeResult<Violations<FormKeys>> = validationError;
  // expect(facadeResult.tag).toBe('reject');
  // expect(facadeResult.kind).toBe('violation');
  const facadeResult: RejectViolation<FormKeys> = {
    tag: 'reject',
    kind: 'violation',
    data: violations,
  };
  expect(facadeResult.tag).toBe('reject');
  expect(facadeResult.kind).toBe('violation');
  expect(facadeResult.data).toBe(violations);
});
