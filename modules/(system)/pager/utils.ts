// ---------------------------
// ページネーションユーティリティ
// ---------------------------

/**
 * ページ番号をオフセットに変換
 */
export function pageToOffset(size: number, page: number): { offset: number; limit: number } {
  const offset = size * page - size;
  const limit = size;
  return { offset, limit };
}

/**
 * 最後のページのオフセット（最終ページの先頭の1件目）を取得する
 */
export function offsetOfLastPage(total: number, limit: number): number {
  return Math.floor((total - 1) / limit) * limit;
}

/**
 *　現在のページと総ページを取得する
 */
export function calcPagination(
  offset: number,
  limit: number,
  total: number,
): { currentPage: number; totalPages: number; effectiveOffset: number } {
  const totalPages = total == 0 ? 0 : Math.ceil(total / limit);
  // offsetがtotalを超えている場合は、最後のページオフセットに補正する
  const effectiveOffset = offset >= total ? offsetOfLastPage(total, limit) : offset;
  const currentPage = Math.floor(effectiveOffset / limit) + 1;
  return { currentPage, totalPages, effectiveOffset };
}
