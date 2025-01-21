// デバッグログ出力用ロガー

/**
 * ロガーの関数型を定義
 */
type DebugLogger = typeof console.log;  // console.logのシグネチャを適用

/**
 * 開発用のロガー実装
 */
const development: DebugLogger = (...args) => console.log(...args); // コンソールを出力

/**
 * 本番用のロガー実装
 */
const production: DebugLogger = () => { };  // 空実装。本番はログを出力しない

/**
 * ロガーを生成するファクトリ関数
 */
const loggerFactory = (): DebugLogger => {
  return process.env.NODE_ENV === 'development' ? development : production;
};

/**
 * デバッグログ出力用ロガー
 */
const debug: DebugLogger = loggerFactory();

export default debug;
