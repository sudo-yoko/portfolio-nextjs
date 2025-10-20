import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import logger from '@/presentation/(system)/logging/logger';
import { z } from 'zod';

/**
 * バリデーターのインターフェース定義。
 * 引数は問わず、戻り値はエラーメッセージの配列とする。
 */
export interface Validator {
  (...args: (string | undefined)[]): string[];
  // 以下のようにjsonを引数に渡した場合はundefinedになる可能性がある
  // const contactBody: ContactBody = await req.json();
  // const result = validate(contactBody);
}

/**
 * 入力フィールドのキーに対応するエラーメッセージを配列で保持するオブジェクトの型。
 * 入力フィールドのキーは型パラメータで渡す。
 */
export type Violations<T extends string> = {
  [key in T]?: string[];
};

/**
 * Violations型に適合するか判定する
 */
export function isViolations(text: string, ...keys: string[]): boolean {
  try {
    // JSONにパースできること
    const parsed = JSON.parse(text);
    for (const [key, value] of Object.entries(parsed)) {
      // 値がstring[]であること
      if (!Array.isArray(value)) {
        return false;
      }
      // キーの配列も渡せる場合はキーのチェックも行う
      if (keys.length > 0 && !keys.includes(key)) {
        return false;
      }
    }
    return true;
  } catch (e) {
    logger.debug(stringify(e).message);
    return false;
  }
}

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
