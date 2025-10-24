//
// Server Actions を使ったロガー
// 主にクライアントサイドからログをサーバーに送信する場合の利用を想定
//
import 'client-only';

import { envByStaticKey as env } from '@/presentation/(system)/env/env-testable';
import { logDebug, logError, logInfo } from '@/presentation/(system)/logging/logging.action';
import debug from '@/presentation/(system)/logging/logging.core.debug';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * ServerActions によるロガー実装
 */
export const loggerImpl: Logger = {
  log: () => {},
  info: (message, _extras) => void logInfo(message),
  warn: () => {},
  error: (message, _extras) => void logError(message),
  debug: (message, _extras) => {
    // デバッグログをコンソールに出力
    debug(message);
    // デバッグログをファイルにも出力したい場合
    if (env.NEXT_PUBLIC_DEBUG_LOGGER) {
      void logDebug(message);
    }
  },
  logAsync: async () => {},
  infoAsync: async (message, _extras) => {
    void logInfo(message);
  },
  warnAsync: async () => {},
  errorAsync: async (message, _extras) => {
    void logError(message);
  },
  debugAsync: async (message, _extras) => {
    debug(message);
  },
};
