import { withErrorHandling } from '@/modules/error-handlers/server-error-handler';

export default function Page() {
  const jst = new Date(new Date().toISOString()).toLocaleString();

  // サーバー側処理をwithErrorHandlingの引数に渡します。
  // serverProcess内で使用しているjst変数は、クロージャを通じてアクセスされます。
  return withErrorHandling(() => serverProcess());

  // サーバー側処理を内部関数として定義することで、
  // withErrorHandling の引数に簡潔に渡せるため、コードの可読性が向上します。
  function serverProcess() {
    return <div>現在時刻は {jst} JST です。</div>;
  }
}

export const dynamic = 'force-dynamic';
