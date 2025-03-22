// アプリケーションとロギングライブラリの直接的な依存をなくし、
// 統一的なロギングインターフェースを提供するロギングファサード。
// ロギングインターフェースを実装したロガーをエクスポートする。

import type { ILogger } from '@/modules/loggers/logging-interface';
import 'server-only';

/**
 * ロガーの実装を読み込む
 */
const load = async (): Promise<ILogger> => {
  return (await import('@/modules/loggers/logger-impl-winston')).loggerImpl;
};

/**
 * ロガー実装
 */
const logger: ILogger = await load();

export default logger;
