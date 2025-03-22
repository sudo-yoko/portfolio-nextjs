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
 * ログ出力インターフェース
 */
export interface ILogger {
  log(level: Level, message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  error(message: unknown): void;
}
