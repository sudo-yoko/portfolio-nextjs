import 'server-only';

import { envByDynamicKey as env } from '@/presentation/(system)/env/env-testable.s';
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
  debug: (message, extras) => {
    // デバッグログをコンソールに出力
    debug(message);
    // デバッグログをファイルにも出力したい場合
    if (env('DEBUG_FILE')) {
      winston.debug(message, { ...extras });
    }
  },
  logAsync: async () => {}, // Not implemented
  infoAsync: async () => {}, // Not implemented
  warnAsync: async () => {}, // Not implemented
  errorAsync: async () => {}, // Not implemented
  debugAsync: async () => {}, // Not implemented
};
