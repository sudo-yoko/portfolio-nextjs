//
// 環境変数取得
// 環境変数取得をモックしやすいようにするためのラッパー。
// クライアントサイドとサーバーサイドの両方で使用されるもの
//

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
  /**
   * process.env.NEXT_PUBLIC_DEBUG_LOGGER
   */
  get NEXT_PUBLIC_DEBUG_LOGGER() {
    return process.env.NEXT_PUBLIC_DEBUG_LOGGER;
  },
} as const;
