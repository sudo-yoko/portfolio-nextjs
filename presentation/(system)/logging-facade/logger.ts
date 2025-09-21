// アプリケーションとロギングライブラリの直接的な依存を無くすためのロギングファサード。
// 統一されたロギングインターフェースを実装したロガーをエクスポートする。

import type { ILogger } from '@/presentation/(system)/logging-facade/logging-interface';
import 'server-only';

/**
 * ロガーの実装を決定する
 */
const resolve = async (): Promise<ILogger> => {
  return (await import('@/presentation/(system)/logging-facade/logger-impl-winston')).loggerImpl;
};

/**
 * ログ出力ロガー
 */
const logger: ILogger = await resolve();

export default logger;
