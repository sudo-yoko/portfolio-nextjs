/**
 * クライアントコンポーネント
 */
'use client';

import debug from '@/modules/debug-logger';
import { useEffect } from 'react';

export function Client() {
  useEffect(() => {
    debug('client Done!');
  });
  return <div></div>;
}
