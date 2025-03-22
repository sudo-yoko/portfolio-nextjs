/**
 * debug-logger.tsをサーバーサイドで使用する例
 */
import Server from '@/app/sample/logging-debug/server';
import debug from '@/modules/loggers/logger-debug';

/**
 * ページコンポーネント
 */
export default function Page() {
  // デバッグログを出力（サーバー側コンソールに出力されます）
  debug('page Done!');
  return <Server></Server>;
}

export const dynamic = 'force-dynamic';
