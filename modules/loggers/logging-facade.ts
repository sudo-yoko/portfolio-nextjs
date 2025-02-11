//
// アプリケーションとロギングライブラリの直接的な依存をなくし、
// 統一的なロギングインターフェースを提供するロギングファサード。
// インターフェースを実装したロガーをエクスポートする。
//
import { loggerImpl } from '@/modules/loggers/logger-impl-winston';
import { Logger } from '@/modules/loggers/logging-interface';
import 'server-only';

const logger: Logger = loggerImpl;

export default logger;
