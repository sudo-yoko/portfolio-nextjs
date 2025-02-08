//
// アプリケーションとロギングライブラリの直接的な依存をなくし、
// 統一的なロギングインターフェースを提供するロギングファサード
//
import { loggerImpl } from '@/modules/loggers/logger-winston';
import { Logger } from '@/modules/loggers/logging-interface';
import 'server-only';

const logger: Logger = loggerImpl;

export default logger;
