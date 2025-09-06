//
// ページネーションユーティリティ
//

/**
 * ページ番号→オフセットに変換
 */
export function pageToOffset(size: number, page: number): { offset: number; limit: number } {
  return { offset: size * page - size, limit: size };
}

/**
 * オフセット→ページ番号に変換
 */
export function offsetToPage(limit: number, offset?: number): { page: number; size: number } {
  throw new Error('Function not implemented.');
}

/**
 * 最後のページのオフセットを取得する
 */
export function offsetOfLastPage(total: number, limit: number): number {
  return Math.floor((total - 1) / limit) * limit; // 最終ページの先頭の1件目
}
