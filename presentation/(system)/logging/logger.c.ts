//
// クライアントサイド用ロガー
//
import 'client-only';

// ロガーの実装を読み込む。ロガー実装を変えたい場合はこのインポート先を修正する
import { loggerImpl } from '@/presentation/(system)/logging/logging.impl.action';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * クライアントサイドロガー
 */
const logger: Logger = loggerImpl;

export default logger;
