/**
 * ページコンポーネント
 */
import { Server } from '@/app/sample/server';
import debug from '@/modules/debug-logger';

export default function page() {
  debug('page Done!');

  return <Server></Server>;
}

export const dynamic = 'force-dynamic';
