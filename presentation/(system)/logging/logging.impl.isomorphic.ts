import debug from '@/presentation/(system)/logging/logging.core.debug';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

export const loggerImpl: Logger = {
  log: () => {},
  logAsync: async () => {},
  info: () => {},
  infoAsync: async () => {},
  warn: () => {},
  warnAsync: async () => {},
  error: () => {},
  errorAsync: async () => {},
  debug: (message, _ext) => debug(message),
  debugAsync: async (message, _ext) => debug(message),
};
