import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [auth-handler.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/auth-handler.test.ts -t 'test1'
test('test1', async() => {
  try {
    await withAuthAsync(() => func());
    async function func() {
      print('func');
    }
    print('正常終了');
  } catch (_e) {
    print('例外発生');
  }
});
