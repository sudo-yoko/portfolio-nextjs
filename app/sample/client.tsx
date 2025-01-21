/**
 * クライアントコンポーネント
 */
'use client';

import debug from '@/modules/debug-logger';
import { useEffect } from 'react';

export function Client() {
  useEffect(() => {
    debug.log('client Done!');
  });
  return <div></div>;
}
