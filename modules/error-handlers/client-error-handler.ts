import { serialize } from '@/modules/error-handlers/error-handling-utils';
import { logError } from '@/modules/loggers/remote-logger';
import React from 'react';
import 'client-only';

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
    logError(serialize(error));
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
    logError(serialize(error));
    setHasError(true);
  }
}
