import 'server-only';

import debug from '@/presentation/(system)/logging/logging.core.debug';
import winston from '@/presentation/(system)/logging/logging.core.winston';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * winston によるロガー実装
 */
export const loggerImpl: Logger = {
  log: (level, message, extras) => {
    winston.log(level, message, { ...extras });
  },
  info: (message, extras) => {
    winston.info(message, { ...extras });
  },
  warn: (message, extras) => {
    winston.warn(message, { ...extras });
  },
  error: (message, extras) => {
    winston.error(message, { ...extras });
  },
  debug: (message, _extras) => {
    debug(message);
    //winston.debug(message, { ...extras });
  },
  logAsync: async () => {}, // Not implemented
  infoAsync: async () => {}, // Not implemented
  warnAsync: async () => {}, // Not implemented
  errorAsync: async () => {}, // Not implemented
  debugAsync: async () => {}, // Not implemented
};
