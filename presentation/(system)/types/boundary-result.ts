//
// クライアントサイド - サーバーサイド境界インターフェース
//

/**
 * 境界返却値がとりうる値を定義する
 *
 * @typeParam RESULT - 正常終了時の返却データの型
 * @typeParam REASON - エラー時返却データの型
 */
export type BoundaryResult<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON> | Aborted;

/**
 * 境界返却値：処理の正常終了
 */
export type Ok<RESULT = void> = [RESULT] extends [void] ? { tag: 'ok' } : { tag: 'ok'; data: RESULT };

/**
 * 境界返却値：処理の差し戻し
 */
export type Rejected<REASON = never> = [REASON] extends [never]
  ? { tag: 'reject'; label: string }
  : { tag: 'reject'; label: string; data: REASON };

/**
 * よく使うラベルを固定値で定義しておく
 */
export const REJECTION_LABELS = {
  /**
   * バリデーションエラー
   */
  VIOLATION: 'violation',
  /**
   * タイムアウト（再試行可能）
   */
  TIMEOUT: 'timeout',
} as const;

/**
 * 境界返却値：処理の完走（正常／差し戻し 問わず）
 */
export type Completed<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON>;

/**
 * 境界返却値：処理の失敗
 */
export type Aborted = { tag: 'abort'; cause?: string };

// オーバーロードシグネチャ
/**
 * 境界返却値生成ファクトリ：正常終了（返却データなし）
 */
export function ok(): Ok<void>;

// オーバーロードシグネチャ
/**
 * 境界返却値生成ファクトリ：正常終了（返却データあり）
 */
export function ok<RESULT>(data: RESULT): Ok<RESULT>;

// 実装シグネチャ
/**
 * 境界返却値生成ファクトリ：正常終了
 */
export function ok<RESULT>(data?: RESULT) {
  return data === undefined ? { tag: 'ok' } : { tag: 'ok', data };
}

export function reject(label: string): Rejected<void>;
export function reject<REASON>(label: string, data: REASON): Rejected<REASON>;
export function reject<REASON>(label: string, data?: REASON) {
  return data === undefined ? { tag: 'reject', label } : { tag: 'reject', label, data };
}

export function complete<RESULT = void, REASON = never>(
  status: Ok<RESULT> | Rejected<REASON>,
): Completed<RESULT, REASON> {
  return status;
}

export function abort(cause?: string): Aborted {
  return { tag: 'abort', cause };
}

/**
 * BoundaryResult型に解析する
 */
export function parseBoundaryResult<RESULT, REASON>(text: string): BoundaryResult<RESULT, REASON> | null {
  try {
    const parsed = JSON.parse(text);
    return isBoundaryResult<RESULT, REASON>(parsed) ? parsed : null;
  } catch (_e) {
    return null;
  }
}

/**
 * 型ガード関数
 */
function isBoundaryResult<RESULT, REASON>(text: unknown): text is BoundaryResult<RESULT, REASON> {
  if (text === null) {
    return false;
  }
  // プリミティブ型の場合
  if (typeof text !== 'object') {
    return false;
  }

  const tag = (text as BoundaryResult<RESULT, REASON>).tag;
  if (tag === 'ok') {
    return true;
  }
  if (tag === 'reject') {
    return true;
  }
  if (tag === 'abort') {
    return true;
  }
  return false;
}

export function isOk<RESULT = void, REASON = never>(
  result: BoundaryResult<RESULT, REASON>,
): result is Ok<RESULT> {
  return result.tag === 'ok';
}

export function isReject<RESULT = void, REASON = never>(
  result: BoundaryResult<RESULT, REASON>,
): result is Rejected<REASON> {
  return result.tag === 'reject';
}

export function isAbort<RESULT = void, REASON = never>(
  result: BoundaryResult<RESULT, REASON>,
): result is Aborted {
  return result.tag === 'abort';
}

export function isComplete<RESULT = void, REASON = never>(
  result: BoundaryResult<RESULT, REASON>,
): result is Completed<RESULT, REASON> {
  return result.tag === 'ok' || result.tag === 'reject';
}
