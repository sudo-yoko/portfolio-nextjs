//
// クライアントサイド エラーハンドリングコンポーネント
//
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ErrorHandler() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/system-error');
  }, [router]);
  return null;
}
