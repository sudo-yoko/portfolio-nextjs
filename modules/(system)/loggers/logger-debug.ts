/**
 * ロガーの型定義
 */
type DebugLogger = typeof console.log; // console.logのシグネチャを適用

/**
 * 開発用のロガー実装
 */
const development: DebugLogger = (...args) => console.log('[DEBUG] ', ...args); // console.logを使用してログを出力する

/**
 * 本番用のロガー実装
 */
const production: DebugLogger = () => {}; // 空実装を適用する

/**
 * ロガーの実装を決定する
 */
function resolve(): DebugLogger {
  return process.env.NODE_ENV === 'development' ? development : production;
}

/**
 * デバッグログ出力ロガー
 */
const debug: DebugLogger = resolve();

export default debug;
