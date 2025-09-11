// カスタムエラー定義

/**
 * カスタムエラーの種類
 * - ActionError  - Server Actions のエラー
 * - AuthError    - 認証エラー
 * - RouteError   - Route Handlers のエラー
 */
export type ErrType = 'ActionError' | 'AuthError' | 'RouteError';

/**
 * Errorオブジェクトに追加するプロパティ
 */
export const ERR_TYPE = Symbol.for('err.type'); // シリアライズで消えるので注意

/**
 * カスタムエラーの型。
 * ErrorオブジェクトにERR_TYPEプロパティを追加したもの
 */
export type CustomError<T extends ErrType> = Error & { [ERR_TYPE]: T };

/**
 * カスタムエラーを生成する
 */
function customError<T extends ErrType>(type: T, message?: string): CustomError<T> {
  const err = new Error(message) as CustomError<T>;
  err.name = type;
  err[ERR_TYPE] = type;
  return err;
}

/**
 * 種類別カスタムエラー
 */
const errorOfType =
  <T extends ErrType>(type: T) =>
  (message?: string) =>
    customError(type, message);

/**
 * Server Actions でエラーが発生
 */
export const actionError = errorOfType('ActionError');

/**
 * 認証エラー発生
 */
export const authError = errorOfType('AuthError');

/**
 * Route Handlers でエラーが発生
 */
export const routeError = errorOfType('RouteError');

/**
 * カスタムエラーの種類を判定する
 */
export function errorOf<T extends ErrType>(e: Error, type: T): boolean {
  if (ERR_TYPE in e) {
    if ((e as CustomError<T>)[ERR_TYPE] === type) {
      return true;
    }
  }
  return false;
}
