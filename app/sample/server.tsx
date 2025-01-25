/**
 * サーバーコンポーネント
 */
import { Client } from '@/app/sample/client';
import 'server-only';
import debug from '@/modules/debug-logger';
import logger from '@/modules/logger';

export function Server() {
  logger.info('test');
  debug('server Done!');

  return <Client></Client>;
}

export const dynamic = 'force-dynamic';
