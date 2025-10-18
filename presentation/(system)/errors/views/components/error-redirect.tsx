//
// クライアントサイド エラーハンドリングコンポーネント
//
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ErrorRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/system-error');
  }, [router]);
  return null;
}
