/**
 * debug-logger.tsをサーバーサイドで使用する例
 */
import Client from '@/app/sample/logging-debug/client';
import debug from '@/modules/loggers/logger-debug';
import 'server-only';

/**
 * サーバーコンポーネント
 */
export default function Server() {
  // デバッグログを出力（サーバー側コンソールに出力されます）
  debug('server Done!');
  return <Client></Client>;
}

export const dynamic = 'force-dynamic';
