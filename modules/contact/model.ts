// お問い合わせフォームのモデル定義

import {
  required,
  requiredEmail,
  ValidationErrors,
  Validator,
} from '@/modules/validators/validator';
import { z } from 'zod';

/**
 * 入力フォームの送信状態。
 * 入力待ち、送信中、送信完了
 */
export type FormStatus = 'idle' | 'sending' | 'complete';

/**
 * 入力フォームのキー。
 * お名前、メールアドレス、お問い合わせ内容
 */
export type FormKey = 'name' | 'email' | 'body';

/**
 * フォームの値を格納するオブジェクトの定義
 */
export type FormData = {
  [key in FormKey]: string;
};

/**
 * フォームのバリデーション
 */
export function validate(formData: FormData): ValidationErrors<FormKey> {
  const errors: ValidationErrors<FormKey> = {};
  errors['name'] = required('お名前', formData.name);
  errors['email'] = requiredEmail('メールアドレス', formData.email);
  errors['body'] = requiredMax10('お問い合わせ内容', formData.body);
  return errors;
}

/**
 * バリデーション：必須で最大１０桁まで
 */
const requiredMax10: Validator = (name, value) => {
  let errors: string[] = [];
  // 必須チェック
  errors = required(name, value);
  if (errors.length > 0) {
    return errors;
  }
  // 桁数チェック
  const result = z
    .string()
    .max(10, `${name}は10文字以内にしてください。`)
    .safeParse(value);
  if (result.error) {
    errors = result.error.errors.map((issue) => issue.message);
    return errors;
  }
  return errors;
};
