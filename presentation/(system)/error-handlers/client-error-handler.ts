//
// クライアントサイドエラーハンドリング
//
import { stringify } from '@/presentation/(system)/error-handlers/error-handling-utils';
import { logError } from '@/presentation/(system)/loggers/logger-client';
import 'client-only';
import React from 'react';

const logPrefix = 'client-error-handler.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function withErrorHandling<T>(
  thunk: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  const fname = 'withErrorHandling: ';

  try {
    // 引数に渡されたサンクを実行
    return thunk();
  } catch (e) {
    logError(logPrefix + fname + stringify(e).all);
    setHasError(true);
  }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。（非同期処理用）
 */
export async function withErrorHandlingAsync<T>(
  thunk: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  const fname = 'withErrorHandlingAsync: ';

  try {
    // 引数に渡されたサンクを実行
    return await thunk();
  } catch (e) {
    logError(logPrefix + fname + stringify(e).all);
    setHasError(true);
  }
}
