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

export const Keys = {
  traceId: 'traceId',
  opt1: 'opt1',
  opt2: 'opt2',
  opt3: 'opt3',
} as const;

/**
 * 追加のログ情報
 */
export type LogExtras = {
  [Keys.traceId]?: string;
  [Keys.opt1]?: string;
  [Keys.opt2]?: string;
  [Keys.opt3]?: string;
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
