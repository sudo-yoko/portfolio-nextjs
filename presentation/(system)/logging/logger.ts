//
// クライアント／サーバー両用ロガー
//

// ロガーの実装を読み込む。ロガー実装を変えたい場合はこのインポート先を修正する
import { loggerImpl } from '@/presentation/(system)/logging/logging.impl.console';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * クライアントサイド／サーバーサイド両用ロガー
 */
const logger: Logger = loggerImpl;

export default logger;
