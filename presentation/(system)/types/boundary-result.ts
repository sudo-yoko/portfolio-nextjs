//
// クライアントサイド - サーバーサイド境界インターフェース
//

//////////////////////////
// 境界返却値
//////////////////////////

/**
 * 処理の正常終了
 *
 * @typeParam RESULT - 返却するデータの型。返却データが無い場合は void を指定する。
 */
export type Ok<RESULT = void> = [RESULT] extends [void] ? { tag: 'ok' } : { tag: 'ok'; data: RESULT };

/**
 * 処理の差し戻し(再試行可能)
 *
 * @typeParam REASON - 返却するデータの型。省略可能。
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
   * タイムアウト
   */
  TIMEOUT: 'timeout',
} as const;

/**
 * 処理の失敗
 */
export type Aborted = { tag: 'abort'; cause?: string };

/**
 * 境界返却値のユニオン型
 *
 * 正常終了｜差し戻し｜失敗
 */
export type BoundaryResult<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON> | Aborted;

/**
 * 境界返却値のユニオン型
 *
 * 処理の完走（正常｜差し戻し）
 */
export type Completed<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON>;

//////////////////////////
// 境界返却値生成ファクトリ
//////////////////////////

/**
 * 正常終了（返却データなし）
 */
// オーバーロードシグネチャ
export function ok(): Ok<void>;

/**
 * 正常終了（返却データあり）
 */
// オーバーロードシグネチャ
export function ok<RESULT>(data: RESULT): Ok<RESULT>;

/**
 * 正常終了
 */
// 実装シグネチャ
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

//////////////////////////
// 型解析、型ガード関数
//////////////////////////

export function parseBoundaryResult<RESULT, REASON>(text: string): BoundaryResult<RESULT, REASON> | null {
  try {
    const parsed = JSON.parse(text);
    return isBoundaryResult<RESULT, REASON>(parsed) ? parsed : null;
  } catch (_e) {
    return null;
  }
}

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
