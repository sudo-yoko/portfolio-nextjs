import winston from '@/modules/(system)/loggers/logger-winston';
import type { ILogger } from '@/modules/(system)/logging-facade/logging-interface';
import { LogExtrasKey } from '@/modules/(system)/logging-facade/logging-interface';

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
  error: (message, ext) => {
    winston.error(message, { [LogExtrasKey.traceId]: ext?.traceId });
  },
};
