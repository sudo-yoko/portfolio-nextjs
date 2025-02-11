import logger from '@/modules/loggers/logger-winston';
import { Logger } from '@/modules/loggers/logging-interface';

/**
 * ロギングファサードの統一インターフェースにマップする
 */
export const loggerImpl: Logger = {
  log: (level, message) => {
    logger.log(level, message);
  },
  info: (message) => {
    logger.info(message);
  },
  warn: (message) => {
    logger.warn(message);
  },
  error: (message: string | unknown) => {
    logger.error(message);
    if (typeof message === 'string') {
      console.log('message type is string');
      logger.error(message);
    } else if (typeof message === 'object' && message !== null) {
      console.log('message type is object');
      logger.error(message);
    } else {
      console.log('message type is other');
      logger.error(message);
    }
  },
};
