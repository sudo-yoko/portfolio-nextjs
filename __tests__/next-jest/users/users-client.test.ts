//
// テスト実行方法
// ターミナルを２つ立ち上げて、一方で npm run mock5、もう一方で以下を実行する
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/users-client.test.ts
//
import { send } from '@/modules/users/models/users-client';

const consolePrefix = '### test: users-client.test.ts >>> ';

test('Sample test', async () => {
  const result = await send(1, 19, { userName: 'test' });
  console.log(consolePrefix + JSON.stringify(result));
});
