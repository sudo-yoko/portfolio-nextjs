import { printf } from '@/__tests__/next-jest/_utils/test-logger';
import { FormData, Validator } from '@/presentation/(system)/validation/validation.types';

const print = printf({ logPrefix: '>>> [validator.test.ts]', stdout: true });

// =============================
// type FormData のテスト
// =============================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validator.test.ts -t 'test1-1'
test('test1-1', () => {
  // キーの定義
  const FormKeys = {
    name: 'name',
    email: 'email',
    body: 'body',
  } as const;
  type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

  // データの定義
  const formData: FormData<FormKeys> = { name: 'test name', email: 'test mail', body: 'test body' };
  print(JSON.stringify(formData));

  // データの定義（配列の場合）
  const formDataArray: FormData<FormKeys, string[]> = {
    name: ['test name'],
    email: ['test mail'],
    body: ['test body'],
  };
  print(JSON.stringify(formDataArray));
});

// =============================
// type Validator のテスト
// =============================

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validator.test.ts -t 'test3-1'
test('test3-1', () => {
  const validate: Validator = (value, label) => {
    const errors: string[] = [];
    if (value === '') {
      errors.push(`${label}が未入力です。`);
    }
    if (value === '') {
      errors.push(`${label}がありません。`);
    }
    return errors;
  };

  const result = validate('', '日付');
  print(result);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validator.test.ts -t 'test3-5'
test('test3-5', () => {
  type Range = 'ymd_st' | 'ymd_ed';
  const formData: FormData<Range> = {
    ymd_st: '20251019',
    ymd_ed: '20251020',
  };
  const validate: Validator<FormData<Range>> = (value, label) => {
    const errors: string[] = [];
    if (value.ymd_st === '') {
      errors.push(`${label}が未入力です。`);
    }
    if (value.ymd_ed === '') {
      errors.push(`${label}が未入力です。`);
    }
    return errors;
  };

  const result = validate(formData, '日付');
  print(result);
});
