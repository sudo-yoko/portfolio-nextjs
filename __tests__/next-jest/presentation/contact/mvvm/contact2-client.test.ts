import { printf } from '@/__tests__/next-jest/_utils/test-logger';
import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import { FormData } from '@/presentation/(system)/types/form-data';
import { sendRequest } from '@/presentation/contact/mvvm/models/backend-facade';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact2-types';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [contact2-client.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/contact/mvvm/contact2-client.test.ts -t 'test1-1'
test('test1-1', async () => {
  // fetch をモックする
  global.fetch = jest.fn(async () => {
    // return new Response(null, { status: 400 });
    // return new Response(JSON.stringify({ name: 'お名前を入力してください。' }), { status: 400 });
    // return new Response(JSON.stringify({ name: ['お名前を入力してください。'] }), { status: 400 });
    // return new Response(JSON.stringify({}), { status: 400 });
    return new Response(null, { status: 200 });
    // return new Response('テキストメッセージ', { status: 400 });
    // return new Response(JSON.stringify({ aaa: 'aaaaa' }), { status: 400 });
  });
  // テストデータ
  const formData: FormData<FormKeys> = {
    name: '',
    email: '',
    body: '',
  };
  // 実行
  try {
    const result = await sendRequest(formData);
    print(`success -> result=${JSON.stringify(result)}`);
  } catch (e) {
    print(`error -> ${stringify(e).all}`);
  }
});
