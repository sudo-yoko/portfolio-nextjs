// アプリケーションとロギングライブラリの直接的な依存を無くすためのロギングファサード。
// 統一されたロギングインターフェースを実装したロガーをエクスポートする。

import type { ILogger } from '@/presentation/(system)/logging-facade/logging-interface';
import 'server-only';

/**
 * ロガーの実装を読み込む
 */
const load = async (): Promise<ILogger> => {
  return (await import('@/presentation/(system)/logging-facade/logger-impl-winston')).loggerImpl;
};

/**
 * ログ出力ロガー
 */
const logger: ILogger = await load();

export default logger;
