export type OffsetFetcher<T, Q> = (
  offset: number,
  limit: number,
  query: Q,
) => Promise<readonly T[]>;
