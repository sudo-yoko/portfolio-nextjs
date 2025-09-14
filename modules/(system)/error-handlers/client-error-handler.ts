import { stringify } from '@/modules/(system)/error-handlers/error-handling-utils';
import { logError } from '@/modules/(system)/loggers/logger-client';
import axios from 'axios';
import 'client-only';
import React from 'react';
import { isRouteError } from './custom-error';

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
  } catch (e) {
    logError(logPrefix + fname + stringify(e).representation);
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
  } catch (e) {
    logError(logPrefix + fname + stringify(e).representation);
    setHasError(true);
  }
}
