// アプリケーションとロギングライブラリの直接的な依存を無くすための、統一されたロギングインターフェースを定義する

import 'server-only';

/**
 * ログレベル
 */
export enum Level {
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

/**
 * 追加のログ情報のキー
 */
export const LogExtrasKey = {
  traceId: 'traceId',
  requestId: 'requestId',
  ext1: 'ext1',
  ext2: 'ext2',
  ext3: 'ext3',
} as const;

/**
 * 追加のログ情報の型
 */
export type LogExtras = {
  [LogExtrasKey.traceId]?: string;
  [LogExtrasKey.requestId]?: string;
  [LogExtrasKey.ext1]?: string;
  [LogExtrasKey.ext2]?: string;
  [LogExtrasKey.ext3]?: string;
};

/**
 * ログ出力インターフェース
 */
export interface ILogger {
  log(level: Level, message: string, ext?: LogExtras): void;
  info(message: string, ext?: LogExtras): void;
  warn(message: string, ext?: LogExtras): void;
  error(message: string, ext?: LogExtras): void;
}
