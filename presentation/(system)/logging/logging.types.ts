// isomorphic

/**
 * ログレベル(値)
 */
export const Level = {
  Info: 'info',
  Warn: 'warn',
  Error: 'error',
} as const;

/**
 * ログレベル(型)
 */
export type Level = (typeof Level)[keyof typeof Level];

/**
 * 追加のログ情報のキー(値)
 */
export const OptionKeys = { opt1: 'opt1', opt2: 'opt2', opt3: 'opt3', opt4: 'opt4', opt5: 'opt5' } as const;

/**
 * 追加のログ情報のキー(型)
 */
export type OptionKeys = (typeof OptionKeys)[keyof typeof OptionKeys];

/**
 * 追加のログ情報
 */
export type Option = {
  [OptionKeys.opt1]?: string;
  [OptionKeys.opt2]?: string;
  [OptionKeys.opt3]?: string;
  [OptionKeys.opt4]?: string;
  [OptionKeys.opt5]?: string;
};

/**
 * ログ出力インターフェース
 */
export interface Logger {
  log(level: Level, message: string, option?: Option): void;
  info(message: string, option?: Option): void;
  warn(message: string, option?: Option): void;
  error(message: string, option?: Option): void;
  debug(message: string, option?: Option): void;
  logAsync(level: Level, message: string, option?: Option): Promise<void>;
  infoAsync(message: string, option?: Option): Promise<void>;
  warnAsync(message: string, option?: Option): Promise<void>;
  errorAsync(message: string, option?: Option): Promise<void>;
  debugAsync(message: string, option?: Option): Promise<void>;
}
