import { withAuthAsync } from '@/modules/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/route-error-handler';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [route-error-handler.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/route-error-handler.test.ts -t 'test1'
test('test1', async () => {
  try {
    const response = await withErrorHandlingAsync(() => func());
    async function func() {
      print('func');
      return new Response(null, { status: 200 });
    }
    print(`正常終了 status=${JSON.stringify(response.status)}`);
  } catch (_e) {
    print('例外発生');
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/route-error-handler.test.ts -t 'test2'
test('test2', async () => {
  try {
    const response = await withErrorHandlingAsync(() => withAuthAsync(() => func()));
    async function func() {
      print('func');
      return new Response(null, { status: 200 });
    }
    print(`正常終了 status=${JSON.stringify(response.status)}`);
  } catch (_e) {
    print('例外発生');
  }
});
