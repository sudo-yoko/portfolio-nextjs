import { z } from 'zod';

/**
 * バリデーターのインターフェース定義。
 * 引数は問わず、戻り値はエラーメッセージの配列とする。
 */
export interface Validator {
  (...args: (string | undefined)[]): string[];
}

/**
 * 入力フィールドのキーに対応するエラーメッセージを配列で保持するオブジェクトの型。
 * 入力フィールドのキーは型パラメータで渡す。
 */
export type Violations<T extends string> = {
  [key in T]?: string[];
};

/**
 * バリデーションエラーの有無を調べる
 */
export function hasError<T extends string>(errors: Violations<T>): boolean {
  return Object.values(errors).some((err) => (err as string[]).length > 0);
}

/**
 * バリデーション：必須入力
 */
export const required: Validator = (name, value) => {
  const errors: string[] = [];
  if (!value || value.trim() === '') {
    errors.push(`${name}を入力してください。`);
  }
  return errors;
};

/**
 * バリデーション：必須のメールアドレス
 */
export const requiredEmail: Validator = (name, value) => {
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
};

/**
 * メールアドレスの形式チェック
 */
export const validateEmail: Validator = (name, value) => {
  const result = z.string().email(`${name}の形式が不正です。`).safeParse(value);
  return result.success ? [] : result.error.errors.map((issue) => issue.message);
};
