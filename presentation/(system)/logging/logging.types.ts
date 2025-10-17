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
export const OptionKeys = {
  traceId: 'traceId',
  requestId: 'requestId',
  ext1: 'ext1',
  ext2: 'ext2',
  ext3: 'ext3',
} as const;

/**
 * 追加のログ情報のキー(型)
 */
export type OptionKeys = (typeof OptionKeys)[keyof typeof OptionKeys];

/**
 * 追加のログ情報
 */
export type Option = {
  [OptionKeys.traceId]?: string;
  [OptionKeys.requestId]?: string;
  [OptionKeys.ext1]?: string;
  [OptionKeys.ext2]?: string;
  [OptionKeys.ext3]?: string;
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
}
