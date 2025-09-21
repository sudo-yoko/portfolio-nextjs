//
// Route Handlers のレスポンスボディの型定義
//

/**
 * 例外発生時のレスポンスボディの型（例外ハンドリングで使用する）
 */
export type Aborted = {
  readonly aborted: true;
  cause?: string;
};

/**
 * 例外発生時レスポンスボディ生成ファクトリ
 */
export const RouteResult = {
  /**
   * 例外発生時レスポンスボディを生成する
   */
  abort(cause?: string): Aborted {
    return { aborted: true, cause };
  },
};
