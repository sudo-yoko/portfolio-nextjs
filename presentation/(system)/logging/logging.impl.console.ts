import debug from '@/presentation/(system)/logging/logging.core.debug';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * コンソールによるロガー実装
 */
export const loggerImpl: Logger = {
  log: (_level, message, _extras) => {
    console.log(message);
  },
  info: (message, _extras) => {
    console.info(message);
  },
  warn: (message, _extras) => {
    console.warn(message);
  },
  error: (message, _extras) => {
    console.error(message);
  },
  debug: (message, _extras) => {
    debug(message);
  },
  logAsync: async () => {}, // Not implemented
  infoAsync: async () => {}, // Not implemented
  warnAsync: async () => {}, // Not implemented
  errorAsync: async () => {}, // Not implemented
  debugAsync: async () => {}, // Not implemented
};
