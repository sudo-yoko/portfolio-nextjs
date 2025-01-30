//
// サーバーサイドエラーハンドリングの実装例（サーバーサイド処理が非同期処理の場合）
//
import { withErrorHandlingAsync } from '@/modules/error-handlers/server-error-handler';
import type { SearchParam, SearchParams } from '@/modules/types/search-params';

export default async function Page(props: { searchParams: SearchParams }) {
  // サーバーサイド処理をwithErrorHandlingAsyncの引数に渡します。
  // serverProcess内で使用しているjst変数は、クロージャを通じてアクセスされます。
  return withErrorHandlingAsync(() => serverProcess());

  // サーバーサイド処理を内部関数として定義することで、
  // withErrorHandling の引数に簡潔に渡せるため、コードの可読性が向上します。
  async function serverProcess() {
    const params = await props.searchParams;
    const para1: SearchParam = params['para1'];
    const para2: SearchParam = params['para2'];
    return (
      <div>
        クエリパラメーターは、para1={para1}とpara2={para2}です。
      </div>
    );
  }
}

export const dynamic = 'force-dynamic';
