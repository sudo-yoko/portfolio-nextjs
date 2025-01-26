import logger from '@/modules/loggers/logger';

/**
 * ページコンポーネント
 */
export default function Page() {
  // サーバーログを出力
  logger.info('Page Done!');
  return <div></div>;
}

export const dynamic = 'force-dynamic';
