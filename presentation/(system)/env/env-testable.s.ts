//
// 環境変数取得
// 環境変数取得をモックしやすいようにするためのラッパー。
// サーバーサイド専用
//
import 'server-only';

/**
 * 環境変数取得（静的プロパティ参照）
 */
export const envByStaticKey = {
  /**
   * process.env.NODE_ENV
   */
  get NODE_ENV() {
    return process.env.NODE_ENV;
  },
} as const;

/**
 * 環境変数取得（動的プロパティ参照）
 */
export const envByDynamicKey = (key: string) => process.env[key];
