import { FormData } from '@/modules/(system)/types/form-data';
import { printf } from '../_utils/test-logger';

const print = printf({ logPrefix: '>>> [form-data.test.ts]', stdout: true });

test('test1', () => {
  // リファクタリング耐性の検証
  type FormKeys = 'userId' | 'userName';
  const formData: FormData<FormKeys> = { userId: '1234', userName: 'test taro' };
  print(formData.userId);
  print(formData.userName);
});
