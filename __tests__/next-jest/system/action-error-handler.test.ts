import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/action-error-handler';
import { User } from '@/presentation/users/min/models/users-types';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [action-error-handler.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/action-error-handler.test.ts -t 'test1'
test('test1', async () => {
  const result = await withErrorHandlingAsync(() => getUser('12345'));
  print(`Result -> ${JSON.stringify(result)}`);

  async function getUser(userId: string): Promise<User> {
    const userName = 'test taro';
    return { userId, userName };
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/action-error-handler.test.ts -t 'test2'
test('test2', async () => {
  const result = await withErrorHandlingAsync(() => postUser());
  print(`Result -> ${JSON.stringify(result)}`);

  async function postUser(): Promise<void> {}
});
