export interface ActionResult<T> {
  status: number;
  body?: T;
}
