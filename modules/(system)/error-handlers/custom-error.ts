// カスタムエラー型を定義する

/**
 * カスタムエラーの種類
 */
export type ErrType = 'ActionError' | 'AuthError';

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
  const err = new Error(`${type}: ${message}`) as CustomError;
  err.name = 'CustomError';
  err[ERR_TYPE] = type;
  return err;
}

/**
 * カスタムエラーの種類を判定する
 */
export function isErrorOf<T extends ErrType>(e: Error, type: T): boolean {
  if (ERR_TYPE in e) {
    if ((e as CustomError)[ERR_TYPE] === type) {
      return true;
    }
  }
  return false;
}
