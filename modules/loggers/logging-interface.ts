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
 * 追加のログ要素
 */
export type AdditionalLogElements = {
  opt1?: string;
  opt2?: string;
  opt3?: string;
};

/**
 * ログ出力インターフェース
 */
export interface ILogger {
  log(level: Level, message: string, meta?: AdditionalLogElements): void;
  info(message: string, meta?: AdditionalLogElements): void;
  warn(message: string, meta?: AdditionalLogElements): void;
  error(message: string, meta?: AdditionalLogElements): void;
  error(message: unknown, meta?: AdditionalLogElements): void;
}
