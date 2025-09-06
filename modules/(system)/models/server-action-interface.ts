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

