//
// Server Actions の戻り値定義
//

export type ActionResult<T> = Aborted | Completed<T>;

type Aborted = {
  abort: true;
  cause?: string;
  //data?: never;
};

type Completed<T> = {
  abort: false;
  data: T;
};

/**
 * ActionResult を生成する
 */
export const ActionResult = {
  complete<T>(data: T): ActionResult<T> {
    return { abort: false, data };
  },
  abort(cause?: string): ActionResult<never> {
    return { abort: true, cause };
  },
};

/*
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
  Ok<T>(body: T): ActionResult<T> {
    return { status: 200, body };
  },

  NoContent(): ActionResult<void> {
    // voidのほか、neverやundefinedも使える
    return { status: 204 };
  },

  BadRequest<T>(body: T): ActionResult<T> {
    return { status: 400, body };
  },

  Error(): ActionResult<void> {
    // voidのほか、neverやundefinedも使える
    return { status: 500 };
  },
} as const;
*/
