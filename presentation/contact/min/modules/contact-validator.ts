import { FormData } from '@/presentation/(system)/types/form-data';
import { required, requiredEmail, Validator, Violations } from '@/presentation/(system)/validators/validator';
import { FormKeys } from '@/presentation/contact/min/modules/contact-types';
import { z } from 'zod';

/**
 * フォームのバリデーション
 */
export function validate(formData: FormData<FormKeys>): Violations<FormKeys> {
  const errors: Violations<FormKeys> = {};
  errors['name'] = required('お名前', formData.name);
  errors['email'] = requiredEmail('メールアドレス', formData.email);
  errors['body'] = requiredMax50('お問い合わせ内容', formData.body);
  return errors;
}

/**
 * バリデーション：必須で最大５０桁まで
 */
const requiredMax50: Validator = (name, value) => {
  let errors: string[] = [];
  // 必須チェック
  errors = required(name, value);
  if (errors.length > 0) {
    return errors;
  }
  // 桁数チェック
  const result = z.string().max(50, `${name}は50文字以内にしてください。`).safeParse(value);
  if (result.error) {
    errors = result.error.errors.map((issue) => issue.message);
    return errors;
  }
  return errors;
};
