//
// 境界設計インターフェース
//

/**
 * 境界返却値ユニオン
 */
export type BoundaryResult<C = void, R = never> = Ok<C> | Rejected<R> | Aborted;

/**
 * 境界返却値：処理の正常終了
 */
export type Ok<C = void> = [C] extends [void] ? { tag: 'ok' } : { tag: 'ok'; data: C };

/**
 * 境界返却値：処理の差し戻し
 */
export type Rejected<R = never> = [R] extends [never] ? { tag: 'reject' } : { tag: 'reject'; cause: R };

/**
 * 境界返却値：処理の完走（正常／差し戻し 問わず）
 */
export type Completed<C = void, R = never> = Ok<C> | Rejected<R>;

/**
 * 境界返却値：処理の失敗
 */
export type Aborted = { tag: 'abort'; cause?: string };

/**
 * 境界返却値生成ファクトリ
 * 正常終了。返却データなし
 * ※オーバーロードシグネチャ
 */
export function ok(): Ok<void>;

/**
 * 正常終了。返却データあり
 * ※オーバーロードシグネチャ
 */
export function ok<C>(data: C): Ok<C>;

/**
 * 正常終了
 * ※実装シグネチャ
 */
export function ok<C>(data?: C) {
  return data === undefined ? { tag: 'ok' } : { tag: 'ok', data };
}

export function reject(): Rejected<void>;
export function reject<R>(cause: R): Rejected<R>;
export function reject<R>(cause?: R) {
  return cause === undefined ? { tag: 'reject' } : { tag: 'reject', cause };
}

export function complete<C = void, R = never>(state: Ok<C> | Rejected<R>): Completed<C, R> {
  return state;
}

export function abort(cause?: string): Aborted {
  return { tag: 'abort', cause };
}
