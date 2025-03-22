// アプリケーションとロギングライブラリの直接的な依存をなくし、
// 統一的なロギングインターフェースを提供するロギングファサード。
// ロギングインターフェースを実装したロガーをエクスポートする。

import type { ILogger } from '@/modules/loggers/logging-interface';
import 'server-only';

/**
 * ロガーの実装を返す
 */
const provide = async (): Promise<ILogger> => {
  return (await import('@/modules/loggers/logger-impl-winston')).loggerImpl;
};

/**
 * ロガー実装
 */
const logger: ILogger = await provide();

export default logger;
