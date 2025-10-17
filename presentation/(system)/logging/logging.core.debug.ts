//
// デバッグロガー
// console.debug を使用してログを出力する。サーバーサイドとクライアントサイドの両方で実行される
// production の場合は空実装を適用し、ログ出力を無効化する。
// 開発中はデバッグログを出力し、本番環境ではログ出力を防ぎます。
//
import { envByStaticKey as env } from '@/presentation/(system)/env/env-testable';

/**
 * ロガーの型定義
 */
type DebugLogger = typeof console.debug; // console.debugのシグネチャを適用

/**
 * 開発用のロガー実装
 */
const debugLogger: DebugLogger = (...args) => console.debug('[DEBUG] ', ...args); // console.debugを使用してログを出力する

/**
 * 本番用のロガー実装
 */
const noop: DebugLogger = () => {}; // 空実装を適用する

/**
 * ロガーの実装を決定する
 */
function createDebugLogger(): DebugLogger {
  // productionモードの場合でもでバックロガーを使いたい場合
  if (env.NEXT_PUBLIC_DEBUG_LOGGER) {
    return debugLogger;
  }
  if (env.NODE_ENV === 'production') {
    return noop;
  }
  return debugLogger;
}

/**
 * デバッグロガー
 */
const debug: DebugLogger = createDebugLogger();

export default debug;
