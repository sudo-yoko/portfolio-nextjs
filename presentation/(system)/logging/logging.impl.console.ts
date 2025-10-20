import debug from '@/presentation/(system)/logging/logging.core.debug';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * コンソールによるロガー実装
 */
export const loggerImpl: Logger = {
  log: (_level, message, _ext) => {
    console.log(message);
  },
  info: (message, _ext) => {
    console.info(message);
  },
  warn: (message, _ext) => {
    console.warn(message);
  },
  error: (message, _ext) => {
    console.error(message);
  },
  debug: (message, _ext) => {
    debug(message);
  },
  logAsync: async () => {}, // Not implemented
  infoAsync: async () => {}, // Not implemented
  warnAsync: async () => {}, // Not implemented
  errorAsync: async () => {}, // Not implemented
  debugAsync: async () => {}, // Not implemented
};
