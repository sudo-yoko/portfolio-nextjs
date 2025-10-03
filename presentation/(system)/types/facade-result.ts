//
// バックエンド・ファサードの戻り値の型定義
//
import { Violations } from '@/presentation/(system)/validators/validator';

/**
 * 正常終了
 */
export type Ok = { tag: 'ok' };
/**
 * 正常終了（返却データあり）
 */
export type OkData<T> = { tag: 'ok'; data: T };
/**
 * バリデーションエラーのため差し戻し
 */
export type RejectViolation<T extends string> = { tag: 'reject'; kind: 'violation'; data: Violations<T> };
