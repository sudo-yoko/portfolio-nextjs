import { actionError, errorOf } from '@/modules/(system)/error-handlers/custom-error';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [custom-error.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test1'
test('test1', () => {
  const e = actionError();
  if (e instanceof Error) {
    if (errorOf(e, 'AuthError')) {
      print('AuthError');
    } else if (errorOf(e, 'ActionError')) {
      print('ActionError');
    } else {
      print('Error');
    }
  } else {
    print('Other');
  }
});
