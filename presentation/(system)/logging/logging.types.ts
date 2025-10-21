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
export const ExtraKeys = {
  extra1: 'extra1',
  extra2: 'extra2',
  extra3: 'extra3',
  extra4: 'extra4',
  extra5: 'extra5',
} as const;

/**
 * 追加のログ情報のキー(型)
 */
export type ExtraKeys = (typeof ExtraKeys)[keyof typeof ExtraKeys];

/**
 * 追加のログ情報
 */
export type Extras = {
  [ExtraKeys.extra1]?: string;
  [ExtraKeys.extra2]?: string;
  [ExtraKeys.extra3]?: string;
  [ExtraKeys.extra4]?: string;
  [ExtraKeys.extra5]?: string;
};

/**
 * ログ出力インターフェース
 */
export interface Logger {
  log(level: Level, message: string, extras?: Extras): void;
  info(message: string, extras?: Extras): void;
  warn(message: string, extras?: Extras): void;
  error(message: string, extras?: Extras): void;
  debug(message: string, extras?: Extras): void;
  logAsync(level: Level, message: string, extras?: Extras): Promise<void>;
  infoAsync(message: string, extras?: Extras): Promise<void>;
  warnAsync(message: string, extras?: Extras): Promise<void>;
  errorAsync(message: string, extras?: Extras): Promise<void>;
  debugAsync(message: string, extras?: Extras): Promise<void>;
}
