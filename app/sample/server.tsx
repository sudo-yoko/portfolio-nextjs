/**
 * サーバーコンポーネント
 */
import { Client } from '@/app/sample/client';
import 'server-only';
import debug from '@/modules/debug-logger';

export function Server() {
  debug('server Done!');

  return <Client></Client>;
}

export const dynamic = 'force-dynamic';
