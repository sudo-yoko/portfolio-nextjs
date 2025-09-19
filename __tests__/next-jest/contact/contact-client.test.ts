import { FormData } from '@/modules/(system)/types/form-data';
import { send } from '@/modules/contact/min/models/contact-client';
import { FormKeys } from '@/modules/contact/min/models/contact-types';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [contact/contact-client.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/contact/contact-client.test.ts -t 'test1-1'
test('test1-1', async () => {
  const formData: FormData<FormKeys> = { name: '111', email: '222', body: 'aaa' };
  print(`formData=${JSON.stringify(formData)}`);

  await send(formData);
});
