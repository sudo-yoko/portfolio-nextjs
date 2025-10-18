//
// メールアドレスのバリデーション
//
import { required } from '@/presentation/(system)/validation/validators.required';
import { z } from 'zod';

/**
 * 必須のメールアドレス
 */
export function requiredEmail(name: string, value: string): string[] {
  const errors: string[] = [];
  // 必須チェック
  errors.push(...required(name, value));
  if (errors.length > 0) {
    return errors;
  }
  // 形式チェック
  errors.push(...validateEmail(name, value));
  if (errors.length > 0) {
    return errors;
  }
  return errors;
}

/**
 * メールアドレスの形式チェック
 */
export function validateEmail(name: string, value: string): string[] {
  const result = z.string().email(`${name}の形式が不正です。`).safeParse(value);
  return result.success ? [] : result.error.errors.map((issue) => issue.message);
}
