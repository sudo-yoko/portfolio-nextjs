//
// メールアドレスのバリデーター
//
import { Validator } from '@/presentation/(system)/validation/validation.types';
import { required } from '@/presentation/(system)/validation/validators.required';
import { z } from 'zod';

/**
 * 必須のメールアドレス
 */
export const requiredEmail: Validator = (value, label) => {
  const errors: string[] = [];
  // 必須チェック
  errors.push(...required(value, label));
  if (errors.length > 0) {
    return errors;
  }
  // 形式チェック
  errors.push(...validateEmail(value, label));
  if (errors.length > 0) {
    return errors;
  }
  return errors;
};

/**
 * メールアドレスの形式チェック
 */
export const validateEmail: Validator = (value, label) => {
  const result = z.string().email(`${label}の形式が不正です。`).safeParse(value);
  return result.success ? [] : result.error.errors.map((issue) => issue.message);
};
