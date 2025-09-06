/**
 * 入力値を保持する汎用マップ型。
 * 型パラメーターには入力値のキーをユニオンで指定する。
 */
export type InputValues<T extends string> = Record<T, string>;

/*
マップド型を使用した実装。上のRecordを使った実装と使い方は同じ。
export type InputValues<T extends string> = {
  [key in T]: string;
};
*/
