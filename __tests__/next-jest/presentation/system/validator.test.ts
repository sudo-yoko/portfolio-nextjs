import { isViolations } from '@/presentation/(system)/validators/validator';

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validator.test.ts -t 'test1-1'
test('test1-1', () => {
  const text = ''; // JSONパース不可
  const result = isViolations(text);
  expect(result).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validator.test.ts -t 'test1-2'
test('test1-2', () => {
  const text = { name: [''], email: [''], body: [''] };
  const json = JSON.stringify(text);
  const result = isViolations(json);
  expect(result).toBe(true);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validator.test.ts -t 'test2-1'
test('test2-1', () => {
  const text = { name: [''], email: [''], body: [''] };
  const json = JSON.stringify(text);
  const result = isViolations(json, 'name', 'email');
  expect(result).toBe(false);
});
