// カスタムエラー定義

/**
 * カスタムエラーの種類
 */
export const ErrTypes = {
  /**
   * Server Actions のエラー
   */
  ACTION_ERROR: 'ACTION_ERROR',

  /**
   * 認証エラー
   */
  AUTH_ERROR: 'AUTH_ERROR',

  /**
   * Route Handlers のエラー
   */
  ROUTE_ERROR: 'ROUTE_ERROR',
} as const;

export type ErrType = (typeof ErrTypes)[keyof typeof ErrTypes];
export type ErrType2 = 'ActionError' | 'AuthError' | 'RouteError';

/**
 * Errorオブジェクトに追加するプロパティ
 */
export const ERR_TYPE = Symbol.for('err.type'); // シリアライズで消えるので注意

/**
 * カスタムエラーの型。
 * ErrorオブジェクトにERR_TYPEプロパティを追加したもの
 */
export type CustomError = Error & { [ERR_TYPE]: ErrType };

/**
 * カスタムエラーを生成する
 */
export function customError(type: ErrType, message?: string): CustomError {
  const err = new Error(message) as CustomError;
  err.name = type;
  err[ERR_TYPE] = type;
  return err;
}

/**
 * カスタムエラーの種類を判定する
 */
export function errorOf<T extends ErrType>(e: Error, type: T): boolean {
  if (ERR_TYPE in e) {
    if ((e as CustomError)[ERR_TYPE] === type) {
      return true;
    }
  }
  return false;
}

export type CustomError2<T extends ErrType2> = Error & { [ERR_TYPE]: T};

export function customError2<T extends ErrType2>(type: T, message?: string): CustomError2<T> {
  const err = new Error(message) as CustomError2<T>;
  err.name = type;
  err[ERR_TYPE] = type;
  return err;
}

export function actionError(message?: string): CustomError2<ErrType2> {
  return customError2<'ActionError'>('ActionError', message);
}
