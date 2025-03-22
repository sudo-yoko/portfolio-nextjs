// デバッグロガーモジュール
// 開発モードの場合にconsole.logを使用してログを出力する。
// 本番モードの場合はロガーに空実装を適用することでログ出力を無効化する。
// このモジュールが最初にインポートされたときにファクトリ関数が実行され、ロガーの実装が決定します。
// 以降はキャッシュされたロガーを再利用するため効率的です。

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
 * ロガーを生成するファクトリ関数
 */
const loggerFactory = (): DebugLogger => {
  return process.env.NODE_ENV === 'development' ? development : production;
};

/**
 * デバッグロガー
 */
const debug = loggerFactory();

export default debug;
