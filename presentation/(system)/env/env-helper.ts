//
// 環境変数取得ユーティリティ
// バリデーション付き。安全に環境変数を取得する。サーバーサイド専用
//
import { envByDynamicKey } from '@/presentation/(system)/env/env-testable.s';
import logger from '@/presentation/(system)/logging-facade/logger';
import 'server-only';

export function env(key: string): string {
  const value = envByDynamicKey(key)?.trim();
  if (!value || value.length === 0) {
    const message = `環境変数 ${key} が設定されていません。`;
    logger?.error(message);
    throw new Error(message);
  }
  return value;
}

export function envNumber(key: string): number {
  const value = env(key);
  const num = Number(value);
  if (isNaN(num)) {
    const message = `環境変数 ${key} の形式が不正です。`;
    logger?.error(message);
    throw new Error(message);
  }
  return num;
}

export function envProtocol(key: string): 'http' | 'https' {
  const value = env(key);
  if (value === 'http' || value === 'https') {
    return value;
  }
  const message = `不正なプロトコルです。[${value}]`;
  logger?.error(message);
  throw new Error(message);
}
