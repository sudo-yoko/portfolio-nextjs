import { z } from 'zod';

/**
 * バリデーターのインターフェース定義。
 * 引数は問わず、戻り値はエラーメッセージの配列とする。
 */
export interface Validator {
  (...args: string[]): string[];
}

/**
 * 入力フィールドのキーに対応するエラーメッセージを配列で保持するオブジェクトの型。
 * 入力フィールドのキーは型パラメータで渡す。
 */
export type ValidationErrors<T extends string> = {
  [key in T]?: string[];
};

/**
 * エラーの有無を調べる。
 */
export function hasError<T extends string>(
  errors: ValidationErrors<T>,
): boolean {
  return Object.values(errors).some((err) => (err as string[]).length > 0);
}

/**
 * バリデーション：必須入力
 */
export const required: Validator = (name: string, value: string) => {
  const errors: string[] = [];
  if (value.trim() === '') {
    errors.push(`${name}を入力してください。`);
  }
  return errors;
};

/**
 * バリデーション：必須のメールアドレス
 */
export const requiredEmail: Validator = (name, value) => {
  let errors: string[] = [];
  // 必須チェック
  errors = required(name, value);
  if (errors.length > 0) {
    return errors;
  }
  // 形式チェック
  const result = z.string().email(`${name}の形式が不正です。`).safeParse(value);
  if (result.error) {
    errors = result.error.errors.map((issue) => issue.message);
    return errors;
  }
  return errors;
};
