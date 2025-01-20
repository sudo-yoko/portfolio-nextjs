// デバッグログ出力用ロガー

/**
 * ロガーの構造定義
 */
interface Debug {
  log: typeof console.debug; // log関数にconsole.debugのシグネチャを適用
}

/**
 * 開発用のロガー実装
 */
const development: Debug = {
  log: (...args) => console.debug(...args),
};

/**
 * 本番用のロガー実装
 */
const production: Debug = {
  log: () => {}, // 空実装
};

/**
 * ロガーを生成するファクトリ
 */
const loggerFactory = (): Debug => {
  return process.env.NODE_ENV === 'development' ? development : production;
};

/**
 * デバッグログ出力用ロガー
 */
const debug = loggerFactory();

export default debug;
