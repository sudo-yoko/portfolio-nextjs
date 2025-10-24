//
// ロギングインターフェース
// アプリケーションとロギングライブラリの直接依存を避け、疎結合に保つためのインターフェース型
//

/**
 * ログレベル
 */
export const Level = {
  Info: 'info',
  Warn: 'warn',
  Error: 'error',
} as const; // 定数オブジェクト
export type Level = (typeof Level)[keyof typeof Level]; // 型

/**
 * 予備スロットのキー
 */
export const ExtraKeys = {
  extra1: 'extra1',
  extra2: 'extra2',
  extra3: 'extra3',
  extra4: 'extra4',
  extra5: 'extra5',
} as const;
export type ExtraKeys = (typeof ExtraKeys)[keyof typeof ExtraKeys];

/**
 * 予備スロット
 */
export type Extras = {
  [ExtraKeys.extra1]?: string;
  [ExtraKeys.extra2]?: string;
  [ExtraKeys.extra3]?: string;
  [ExtraKeys.extra4]?: string;
  [ExtraKeys.extra5]?: string;
};

/**
 * ロギングのインターフェース型
 */
export type Logger = {
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
};
