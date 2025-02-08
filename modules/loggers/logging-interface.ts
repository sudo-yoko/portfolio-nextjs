//
// ロギングのための統一的なインターフェース
//
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
 * ログ出力関数
 */
export interface Logger {
  log(level: Level, message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  error(message: object): void;
  //error(message: unknown): void;
}
