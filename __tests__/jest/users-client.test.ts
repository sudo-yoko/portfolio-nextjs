/**
 * "jest": "cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/jest/users-client.test.ts",
 * npm run jest
 * テスト実行方法
 * ターミナルを２つ立ち上げて、一方で npm run mock5、もう一方で npm run node:test を実行する。
 * 
 */
import { send } from '@/modules/users/models/users-client';

const consolePrefix = '### test: users-client.test.ts >>> ';

test('Sample test', async () => {
  const result = await send(1, 19, { userName: 'test' });
  console.log(consolePrefix + JSON.stringify(result));
});
