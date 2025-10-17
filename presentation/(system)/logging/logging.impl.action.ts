//
// Server Actions を使ったロガー
// 主にクライアントサイドからログをサーバーに送信する場合の利用を想定
//
import 'client-only';

import { envByStaticKey as env } from '@/presentation/(system)/env/env-testable';
import { logDebug, logError, logInfo } from '@/presentation/(system)/logging/logging.action';
import debug from '@/presentation/(system)/logging/logging.core.debug';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

export const loggerImpl: Logger = {
  log: () => {},
  info: (message, _ext) => void logInfo(message),
  warn: () => {},
  error: (message, _ext) => void logError(message),
  debug: (message, _ext) => {
    // デバッグログをコンソールに出力
    debug(message);
    // デバッグログをファイルにも出力したい場合
    if (env.NEXT_PUBLIC_DEBUG_LOGGER) {
      void logDebug(message);
    }
  },
};
