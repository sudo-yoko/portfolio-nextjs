//
// お問い合わせフォーム ページ
//
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/server-error-handler';
import { SearchParams } from '@/presentation/(system)/types/search-params';
import { handleRequest } from '@/presentation/contact/mvvm/view-models/contact.request-handler';
import Steps from '@/presentation/contact/mvvm/views/contact.steps';
import 'server-only';

export default async function Page(props: { searchParams?: SearchParams }) {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => func());

  async function func() {
    const _result = handleRequest(props);
    return (
      <>
        <div>
          <Steps />
        </div>
      </>
    );
  }
}
