//
// サーバーアクションのインターフェース定義
//

export interface ServerAction<T> {
  (...args: unknown[]): Promise<ServerActionResult<T>>;
}

export interface ServerActionResult<T> {
  status: number;
  body?: T;
}

export interface ActionResult<T> {
  status: number;
  body?: T;
}

export const ActionResult = {
  /**
   * 成功。ステータスコード200に相当
   */
  Ok<T>(body: T): ActionResult<T> {
    return { status: 200, body };
  },
  /**
   * エラー。ステータスコード500に相当
   */
  Error(): ActionResult<void> {
    return { status: 500 };
  },
} as const;
