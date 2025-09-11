// カスタムエラー定義

/**
 * カスタムエラーの種類
 * - ActionError  - Server Actions でエラーが発生したことを示すカスタムエラー
 * - AuthError    - 認証エラーが発生したことを示すカスタムエラー
 * - RouteError   - Route Handlers でエラーが発生したことを示すカスタムエラー
 */
export type ErrType = 'ActionError' | 'AuthError' | 'RouteError';

/**
 * Errorインスタンスに追加するプロパティ
 */
export const ERR_TYPE = Symbol.for('err.type'); // シリアライズで消えるので注意

/**
 * カスタムエラーの型。
 * ErrorインスタンスにERR_TYPEプロパティを追加したもの
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
 * 種類別カスタムエラー生成ファクトリ
 */
const errorOfType =
  <T extends ErrType>(type: T) =>
  (message?: string) =>
    customError(type, message);

/**
 * ActionError を生成する
 */
export const actionError = errorOfType('ActionError');

/**
 * AuthError を生成する
 */
export const authError = errorOfType('AuthError');

/**
 * RouteError を生成する
 */
export const routeError = errorOfType('RouteError');

/**
 * 種類別カスタムエラー判定ファクトリ
 */
function isErrorOf<T extends ErrType>(type: T) {
  return (e: unknown) => {
    if (e instanceof Error) {
      if (ERR_TYPE in e) {
        if ((e as CustomError<T>)[ERR_TYPE] === type) {
          return true;
        }
      }
    }
    return false;
  };
}

/**
 * ActionError かどうかを判定する
 */
export const isActionError = isErrorOf('ActionError');

/**
 * AuthError かどうかを判定する
 */
export const isAuthError = isErrorOf('AuthError');

/**
 * RouteError かどうかを判定する
 */
export const isRouteError = isErrorOf('RouteError');
