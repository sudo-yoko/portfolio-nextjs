// ロギングのための統一的なインターフェースを定義するモジュール

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
  opt1: 'opt1',
  opt2: 'opt2',
  opt3: 'opt3',
} as const;

/**
 * 追加のログ情報の型
 */
export type LogExtras = {
  [LogExtrasKey.traceId]?: string;
  [LogExtrasKey.opt1]?: string;
  [LogExtrasKey.opt2]?: string;
  [LogExtrasKey.opt3]?: string;
};

/**
 * ログ出力インターフェース
 */
export interface ILogger {
  log(level: Level, message: string, ext?: LogExtras): void;
  info(message: string, ext?: LogExtras): void;
  warn(message: string, ext?: LogExtras): void;
  error(message: string, ext?: LogExtras): void;
  error(message: unknown, ext?: LogExtras): void;
}
