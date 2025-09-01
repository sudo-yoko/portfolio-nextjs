// テスト実行
// npm exec -- node --test --import tsx __tests__/node-test/validator.test.ts

import { required, requiredEmail } from '@/modules/(system)/validators/validator';
import test from 'node:test';

const consolePrefix = '### test: validator.test.ts >>> ';

test('test1', async () => {
  const result = required('userId', '');
  console.log(consolePrefix + `result -> ${result}`);
});

test('test2', async () => {
  const result = requiredEmail('email', 'aaa');
  console.log(consolePrefix + `result -> ${result}`);
});
