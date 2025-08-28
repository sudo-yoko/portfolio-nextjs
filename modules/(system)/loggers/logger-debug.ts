/**
 * ロガーの型定義
 */
type DebugLogger = typeof console.debug; // console.debugのシグネチャを適用

/**
 * 開発用のロガー実装
 */
const debugLogger: DebugLogger = (...args) => console.debug('[DEBUG] ', ...args); // console.logを使用してログを出力する

/**
 * 本番用のロガー実装
 */
const noop: DebugLogger = () => {}; // 空実装を適用する

/**
 * ロガーの実装を決定する
 */
function createDebugLogger(): DebugLogger {
  return process.env.NODE_ENV === 'development' ? debugLogger : noop;
}

/**
 * デバッグログ出力ロガー
 */
const debug: DebugLogger = createDebugLogger();

export default debug;
