import winston from '@/modules/loggers/logger-winston';
import type { ILogger } from '@/modules/loggers/logging-interface';
import { LogExtrasKey } from '@/modules/loggers/logging-interface';

/**
 * winstonロガーを、ロギングファサードの統一インターフェースにマップする
 */
export const loggerImpl: ILogger = {
  log: (level, message, ext) => {
    winston.log(level, message, { [LogExtrasKey.traceId]: ext?.traceId });
  },
  info: (message, ext) => {
    winston.info(message, { [LogExtrasKey.traceId]: ext?.traceId });
  },
  warn: (message, ext) => {
    winston.warn(message, { [LogExtrasKey.traceId]: ext?.traceId });
  },
  error: (message: unknown, ext) => {
    if (typeof message === 'string') {
      winston.error(message, { [LogExtrasKey.traceId]: ext?.traceId });
    } else if (message instanceof Error) {
    }
  },
};
