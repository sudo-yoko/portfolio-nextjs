/**
 * debug-logger.tsをクライアントサイドで使用する例
 */
'use client';

import debug from '@/modules/loggers/debug-logger';
import { useEffect } from 'react';

/**
 * クライアントコンポーネント
 */
export default function Client() {
  useEffect(() => {
    // デバッグログを出力（ブラウザコンソールに出力されます）
    debug('client Done!');
  });
  return <div></div>;
}
