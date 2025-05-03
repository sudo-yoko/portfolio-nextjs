import { required, ValidationErrors } from '@/modules/validators/validator';

export type FormStatus = 'idle' | 'sending' | 'complete';

/**
 * フォームのキー
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
  errors['email'] = required('メールアドレス', formData.email);
  errors['body'] = required('お問い合わせ内容', formData.body);
  return errors;
}
