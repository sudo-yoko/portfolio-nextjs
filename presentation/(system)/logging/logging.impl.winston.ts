import 'server-only';

import debug from '@/presentation/(system)/logging/logging.core.debug';
import winston from '@/presentation/(system)/logging/logging.core.winston';
import type { Logger } from '@/presentation/(system)/logging/logging.types';
import { OptionKeys } from '@/presentation/(system)/logging/logging.types';
import { envByDynamicKey as env } from '../env/env-testable.s';

/**
 * winstonロガーを、ロギングファサードの統一インターフェースにマップする
 */
export const loggerImpl: Logger = {
  log: (level, message, ext) => {
    winston.log(level, message, { [OptionKeys.traceId]: ext?.traceId });
  },
  info: (message, ext) => {
    winston.info(message, { [OptionKeys.traceId]: ext?.traceId });
  },
  warn: (message, ext) => {
    winston.warn(message, { [OptionKeys.traceId]: ext?.traceId });
  },
  error: (message, ext) => {
    winston.error(message, { [OptionKeys.traceId]: ext?.traceId });
  },
  debug: (message, ext) => {
    // デバッグログをコンソールに出力
    debug(message);
    // デバッグログをファイルにも出力したい場合
    if (env('DEBUG_FILE')) {
      winston.debug(message, { [OptionKeys.traceId]: ext?.traceId });
    }
  },
};
