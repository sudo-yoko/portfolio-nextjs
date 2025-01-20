// デバッグログ出力用ロガー

/**
 * ロガーの構造定義
 */
interface DebugLogger {
  log: typeof console.debug; // log関数にconsole.debugのシグネチャを適用
}

/**
 * 開発用のロガー実装
 */
const development: DebugLogger = {
  log: (...args) => console.debug(...args),
};

/**
 * 本番用のロガー実装
 */
const production: DebugLogger = {
  log: () => {}, // 空実装
};

/**
 * ロガーを生成するファクトリ
 */
const loggerFactory = (): DebugLogger => {
  return process.env.NODE_ENV === 'development' ? development : production;
};

/**
 * デバッグログ出力用ロガー
 */
const debug: DebugLogger = loggerFactory();

export default debug;
