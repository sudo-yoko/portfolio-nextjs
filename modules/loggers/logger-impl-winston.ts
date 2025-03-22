import winston from '@/modules/loggers/logger-winston';
import { ILogger } from '@/modules/loggers/logging-interface';

/**
 * winstonロガーを、ロギングファサードの統一インターフェースにマップする
 */
export const loggerImpl: ILogger = {
  log: (level, message, option) => {
    winston.log(level, message);
  },
  info: (message, option) => {
    winston.info(message);
  },
  warn: (message, option) => {
    winston.warn(message);
  },
  error: (message: string | unknown, option) => {
    winston.error(message);
    if (typeof message === 'string') {
      console.log('message type is string');
      winston.error(message);
    } else if (typeof message === 'object' && message !== null) {
      console.log('message type is object');
      winston.error(message);
    } else {
      console.log('message type is other');
      winston.error(message);
    }
  },
};
