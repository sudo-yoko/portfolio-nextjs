//
// 境界設計インターフェース
//

/**
 * 境界返却値ユニオン
 */
export type BoundaryResult<O = void, R = never> = Ok<O> | Rejected<R> | Aborted;

/**
 * 境界返却値：処理の正常終了
 */
export type Ok<O = void> = [O] extends [void] ? { tag: 'ok' } : { tag: 'ok'; data: O };

/**
 * 境界返却値：処理の差し戻し
 */
export type Rejected<R = never> = [R] extends [never]
  ? { tag: 'reject'; label: string }
  : { tag: 'reject'; label: string; reason: R };

/**
 * 境界返却値：処理の完走（正常／差し戻し 問わず）
 */
export type Completed<O = void, R = never> = Ok<O> | Rejected<R>;

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
export function ok<O>(data: O): Ok<O>;

/**
 * 正常終了
 * ※実装シグネチャ
 */
export function ok<O>(data?: O) {
  return data === undefined ? { tag: 'ok' } : { tag: 'ok', data };
}

export function reject(label: string): Rejected<void>;
export function reject<R>(label: string, reason: R): Rejected<R>;
export function reject<R>(label: string, reason?: R) {
  return reason === undefined ? { tag: 'reject', label } : { tag: 'reject', label, reason };
}

export function complete<O = void, R = never>(state: Ok<O> | Rejected<R>): Completed<O, R> {
  return state;
}

export function abort(cause?: string): Aborted {
  return { tag: 'abort', cause };
}

// export function isBoundaryResult<O, R>(text: string): text is BoundaryResult<O, R> {
  // const parsed = JSON.parse(text);
  // return true;
// }
