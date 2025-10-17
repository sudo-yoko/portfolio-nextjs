//
// サーバーサイド用ロガー
//
import 'server-only';

import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * ロガーの実装を読み込む
 */
const load = async (): Promise<Logger> => {
  return (await import('@/presentation/(system)/logging/logging.impl.winston')).loggerImpl;
};

/**
 * サーバーサイドロガー
 */
const logger: Logger = await load();

export default logger;
