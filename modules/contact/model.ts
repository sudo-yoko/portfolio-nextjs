import {
  required,
  requiredEmail,
  ValidationErrors,
} from '@/modules/validators/validator';

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
  errors['body'] = required('お問い合わせ内容', formData.body);
  return errors;
}
