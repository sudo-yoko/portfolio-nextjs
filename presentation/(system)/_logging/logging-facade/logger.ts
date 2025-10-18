// アプリケーションとロギングライブラリの直接的な依存を無くすためのロギングファサード。
// 統一されたロギングインターフェースを実装したロガーをエクスポートする。

import type { Logger } from '@/presentation/(system)/_logging/logging-facade/logging-interface';
import 'server-only';

/**
 * ロガーの実装を読み込む
 */
const load = async (): Promise<Logger> => {
  return (await import('@/presentation/(system)/_logging/logging-facade/logger.impl.winston')).loggerImpl;
};

/**
 * ログ出力ロガー
 */
const logger: Logger = await load();

export default logger;
