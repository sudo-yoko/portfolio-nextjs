/**
 * サーバーコンポーネント
 */
import { Client } from '@/app/sample/logging-debug/client';
import debug from '@/modules/debug-logger';
import 'server-only';

export function Server() {
  debug('server Done!');
  return <Client></Client>;
}

export const dynamic = 'force-dynamic';
