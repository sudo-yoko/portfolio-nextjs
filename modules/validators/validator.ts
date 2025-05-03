import { z } from 'zod';

export interface Validator {
  (name: string, value: string): string[];
}

export type ValidationErrors<T extends string> = {
  [key in T]?: string[];
};

export function hasError<T extends string>(
  errors: ValidationErrors<T>,
): boolean {
  return Object.values(errors).some((err) => (err as string[]).length > 0);
}

/**
 * 必須チェック
 */
export const required: Validator = (name, value) => {
  const errors: string[] = [];
  if (value.trim() === '') {
    errors.push(`${name}を入力してください。`);
  }
  return errors;
};

/**
 *
 */
export const requiredEmail: Validator = (name, value) => {
  const errors: string[] = [];
  const result = z
    .string()
    .min(1, `${name}を入力してください。`)
    .email(`${name}の形式が不正です。`)
    .safeParse(value);
  if (result.success) {
    return errors;
  }
  const error = result.error;

  return errors;
};
