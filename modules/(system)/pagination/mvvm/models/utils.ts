// 
// ページネーションユーティリティ
// 

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
  const effectiveOffset = toEffectiveOffset(offset, limit, total);
  const currentPage = Math.floor(effectiveOffset / limit) + 1;
  return { currentPage, totalPages, effectiveOffset };
}

/**
 * 実効オフセットに補正する（下限用）
 */
export function toEffectiveOffsetMin(offset: number): number {
  if (offset < 0) {
    return 0;
  }
  return offset;
}

/**
 * 実効オフセットに補正する
 */
export function toEffectiveOffset(offset: number, limit: number, total: number): number {
  let effectiveOffset = toEffectiveOffsetMin(offset);
  // offsetがtotalを超えている場合は、最後のページオフセットに補正する
  if (effectiveOffset >= total) {
    effectiveOffset = offsetOfLastPage(total, limit);
  }
  return effectiveOffset;
}
