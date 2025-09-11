import { customError, ErrTypes, errorOf } from '@/modules/(system)/error-handlers/custom-error';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [custom-error.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/system/custom-error.test.ts -t 'test1'
test('test1', () => {
  const e = customError(ErrTypes.ACTION_ERROR);
  if (e instanceof Error) {
    if (errorOf(e, ErrTypes.AUTH_ERROR)) {
      print('AuthError');
    } else if (errorOf(e, ErrTypes.ACTION_ERROR)) {
      print('ActionError');
    } else {
      print('Error');
    }
  } else {
    print('Other');
  }
});
