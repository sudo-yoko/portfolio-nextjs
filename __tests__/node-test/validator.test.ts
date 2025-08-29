/**
 * Node.js 組み込みのテストランナーによるテスト
 *
 * npm i -D tsx
 * package.json:
 *      "node:test": "node --test --import tsx '__tests__/node-test/validator.test.ts'"
 *
 *      特定のテストメソッドのみ実行したい場合。--test-name-patternにテスト名を指定
 *      "node:test": "node --test --import tsx --test-name-pattern='test2' '__tests__/node-test/validator.test.ts'"
 *
 * テスト実行方法
 * npm run node:test
 */
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
