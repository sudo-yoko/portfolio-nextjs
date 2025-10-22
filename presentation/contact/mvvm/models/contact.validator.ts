import { FormData, Validator, Violations } from '@/presentation/(system)/validation/validation.types';
import { requiredEmail } from '@/presentation/(system)/validation/validators.email';
import { required } from '@/presentation/(system)/validation/validators.presence';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { z } from 'zod';

/**
 * フォームのバリデーション
 */
export function validate(formData: FormData<FormKeys>): Violations<FormKeys> {
  const errors: Violations<FormKeys> = {};
  errors['name'] = required(formData.name, 'お名前');
  errors['email'] = requiredEmail(formData.email, 'メールアドレス');
  errors['body'] = requiredMax50(formData.body, 'お問い合わせ内容');
  return errors;
}

/**
 * バリデーション：必須で最大５０桁まで
 */
const requiredMax50: Validator = (value, label) => {
  let errors: string[] = [];
  // 必須チェック
  errors = required(value, label);
  if (errors.length > 0) {
    return errors;
  }
  // 桁数チェック
  const result = z.string().max(50, `${label}は50文字以内にしてください。`).safeParse(value);
  if (result.error) {
    errors = result.error.errors.map((issue) => issue.message);
    return errors;
  }
  return errors;
};
