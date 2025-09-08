import { FormData } from '@/modules/contact/model';
import { sendAction } from '@/modules/contact/send-action';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [contact/send-action.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/contact/send-action.test.ts -t 'test1'
test('test1', async () => {
  const formData: FormData = { name: '', email: '', body: '' };
  const result = await sendAction(formData);
  print(`Result -> ${JSON.stringify(result)}`);
  print(`Result -> status=${result.abort}`);
  if (!result.abort) {
    print(`Result -> body=${JSON.stringify(result.data)}`);
  }
});

// npm run mock2
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/contact/send-action.test.ts -t 'test2'
test('test2', async () => {
  const formData: FormData = { name: '名前', email: 'test@test.com', body: '内容' };
  const result = await sendAction(formData);
  print(`Result -> ${JSON.stringify(result)}`);
  print(`Result -> status=${result.abort}`);
  if (!result.abort) {
    print(`Result -> body=${JSON.stringify(result.data)}`);
  }
});
