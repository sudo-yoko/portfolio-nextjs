//
// カスタムエラー定義
//
import { ActionResult } from '@/modules/(system)/types/action-result';

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
  <T extends ErrType>(type: T, cause?: string) =>
  () =>
    customError(type, cause);

/**
 * AuthError を生成する
 */
export const authError = errorOfType('AuthError', '認証エラー');

/**
 * ActionError を生成する
 */
// export const actionError = errorOfType('ActionError', 'An exception occurred in a Server Action.');
export function actionError<T>(result: ActionResult<T>): CustomError<'ActionError'> {
  const cause: string[] = [];
  cause.push(`abort=${result.abort}`);
  if (result.abort) {
    cause.push(`cause=${result.cause}`);
  }
  if (!result.abort) {
    cause.push(`data=${JSON.stringify(result.data)}`);
  }
  return customError('ActionError', cause.join(', '));
}

/**
 * RouteError を生成する　※awaitを付けて呼ぶこと
 */
// export const routeError = errorOfType('RouteError', 'An exception occurred in a Route Handler.');
export async function routeError(
  res: Response,
  meta?: { method?: string; route?: string },
): Promise<CustomError<'RouteError'>> {
  const status = res.status;
  const body = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
  const cause: string[] = [];
  if (meta?.method) {
    cause.push(`method=${meta.method}`);
  }
  if (meta?.route) {
    cause.push(`route=${meta.route}`);
  }
  cause.push(`status=${status.toString()}`);
  if (body) {
    cause.push(`body=${body}`);
  }
  return customError('RouteError', cause.join(', '));
}

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
