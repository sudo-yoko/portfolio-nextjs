// アプリケーションとロギングライブラリの直接的な依存を無くすためのロギングファサード。
// 統一的なロギングインターフェースを実装したロガーをエクスポートする。

import type { ILogger } from '@/modules/loggers/logging-interface';
import 'server-only';

/**
 * ロガー実装を決定するファクトリ関数
 */
const loggerFactory = async (): Promise<ILogger> => {
  return (await import('@/modules/loggers/logger-impl-winston')).loggerImpl;
};

/**
 * ログ出力ロガー
 */
const logger: ILogger = await loggerFactory();

export default logger;
