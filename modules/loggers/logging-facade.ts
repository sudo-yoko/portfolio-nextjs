// アプリケーションとロギングライブラリの直接的な依存をなくし、
// 統一的なロギングインターフェースを提供するロギングファサード。
// ロギングインターフェースを実装したロガーをエクスポートする。

import { loggerImpl } from '@/modules/loggers/logger-impl-winston';
import { ILogger } from '@/modules/loggers/logging-interface';
import 'server-only';

const logger: ILogger = loggerImpl;

export default logger;
