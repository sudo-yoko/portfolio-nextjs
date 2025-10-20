//
// バリデーションのヘルパー関数
//
import { stringify } from '@/presentation/(system)/errors/stringify-error';
import logger from '@/presentation/(system)/logging/logger';
import { Violations } from '@/presentation/(system)/validators/validator';

/**
 * バリデーションエラーの有無を調べる
 */
export function hasError<T extends string>(errors: Violations<T>): boolean {
  return Object.values(errors).some((err) => (err as string[]).length > 0);
}

/**
 * Violations型に適合するか調べる
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
