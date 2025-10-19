import { Validator } from '@/presentation/(system)/validation/validation.types';

/**
 * バリデーション：必須入力
 */
export const required: Validator = (value, label) => {
  const errors: string[] = [];
  if (!value || value.trim() === '') {
    errors.push(`${label}を入力してください。`);
  }
  return errors;
};
