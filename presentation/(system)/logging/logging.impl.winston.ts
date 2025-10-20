import 'server-only';

import { envByDynamicKey as env } from '@/presentation/(system)/env/env-testable.s';
import debug from '@/presentation/(system)/logging/logging.core.debug';
import winston from '@/presentation/(system)/logging/logging.core.winston';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * winston によるロガー実装
 */
export const loggerImpl: Logger = {
  log: (level, message, ext) => {
    winston.log(level, message, { ...ext });
  },
  info: (message, ext) => {
    winston.info(message, { ...ext });
  },
  warn: (message, ext) => {
    winston.warn(message, { ...ext });
  },
  error: (message, ext) => {
    winston.error(message, { ...ext });
  },
  debug: (message, ext) => {
    // デバッグログをコンソールに出力
    debug(message);
    // デバッグログをファイルにも出力したい場合
    if (env('DEBUG_FILE')) {
      winston.debug(message, { ...ext });
    }
  },
  logAsync: async () => {}, // Not implemented
  infoAsync: async () => {}, // Not implemented
  warnAsync: async () => {}, // Not implemented
  errorAsync: async () => {}, // Not implemented
  debugAsync: async () => {}, // Not implemented
};
