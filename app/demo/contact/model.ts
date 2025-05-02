import { required, ValidationErrors } from '@/modules/validators/validator';

/**
 * フォームデータ
 */
export interface FormData {
  name: string;
  email: string;
  body: string;
}

/**
 * フォームのバリデーション
 */
export function validate(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  errors['name'] = required('お名前', formData.name);
  errors['email'] = required('メールアドレス', formData.email);
  errors['body'] = required('お問い合わせ内容', formData.body);
  return errors;
}
