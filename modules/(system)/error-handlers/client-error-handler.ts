import { serialize } from '@/modules/(system)/error-handlers/error-handling-utils';
import { logError } from '@/modules/(system)/loggers/remote-logger';
import 'client-only';
import React from 'react';

const logPrefix = 'client-error-handler.ts: ';

/**
 * クライアントサイドエラーハンドリング
 */
export function withErrorHandling<T>(
  func: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  try {
    // 引数に渡された関数を実行
    return func();
  } catch (error) {
    logError(logPrefix + serialize(error));
    setHasError(true);
  }
}

/**
 * クライアントサイドエラーハンドリング（非同期処理用）
 */
export async function withErrorHandlingAsync<T>(
  func: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  try {
    // 引数に渡された関数を実行
    return await func();
  } catch (error) {
    logError(logPrefix + serialize(error));
    setHasError(true);
  }
}
