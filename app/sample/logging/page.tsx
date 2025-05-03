import winston from '@/modules/loggers/logger-winston';
import logger from '@/modules/logging-facade/logger';

/**
 * ページコンポーネント
 */
export default function Page() {
  // サーバーログを出力
  winston.info('aaa', { aaa: 'aaa' });
  logger.info('Page Done!');
  logger.info('Page Done!', { ext1: 'page.tsx' });
  return <div></div>;
}

export const dynamic = 'force-dynamic';
