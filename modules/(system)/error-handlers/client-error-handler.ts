import { serialize } from '@/modules/(system)/error-handlers/error-handling-utils';
import { logError } from '@/modules/(system)/loggers/logger-client';
import 'client-only';
import React from 'react';

const logPrefix = 'client-error-handler.ts: ';

/**
 * クライアントサイドエラーハンドリング
 */
export function withErrorHandling<T>(
  thunk: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  const fname = 'withErrorHandling: ';

  try {
    // 引数に渡されたサンクを実行
    return thunk();
  } catch (error) {
    logError(logPrefix + fname + serialize(error));
    setHasError(true);
  }
}

/**
 * クライアントサイドエラーハンドリング（非同期処理用）
 */
export async function withErrorHandlingAsync<T>(
  thunk: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  const fname = 'withErrorHandlingAsync: ';

  try {
    // 引数に渡されたサンクを実行
    return await thunk();
  } catch (error) {
    logError(logPrefix + fname + serialize(error));
    setHasError(true);
  }
}
