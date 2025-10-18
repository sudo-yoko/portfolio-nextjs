import winston from '@/presentation/(system)/_/logging/loggers/logger-winston';
import type { Logger } from '@/presentation/(system)/_/logging/logging-facade/logging-interface';
import { LogExtrasKey } from '@/presentation/(system)/_/logging/logging-facade/logging-interface';

/**
 * winstonロガーを、ロギングファサードの統一インターフェースにマップする
 */
export const loggerImpl: Logger = {
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
