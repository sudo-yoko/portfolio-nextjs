import logger from '@/modules/loggers/logger';

/**
 * ページコンポーネント
 */
export default function Page() {
  // サーバーログを出力
  logger.info('Page Done!');
  logger.info('Page Done!', { moduleName: 'page.tsx' });
  return <div></div>;
}

export const dynamic = 'force-dynamic';
