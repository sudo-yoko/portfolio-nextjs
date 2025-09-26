//
// お問い合わせフォーム ページ
//
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/server-error-handler';
import logger from '@/presentation/(system)/logging-facade/logger';
import { getQueryParams, SearchParams } from '@/presentation/(system)/types/search-params';
import { ContactParams } from '@/presentation/contact/mvvm/models/contact2-types';
import Steps from '@/presentation/contact/mvvm/views/steps';
import 'server-only';

const logPrefix = '/contact/mvvm/views/page.impl.tsx: ';

export default async function Page(props: { searchParams?: SearchParams }) {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => func());

  async function func() {
    // クエリパラメータを取得する
    const params: ContactParams = await getQueryParams(props.searchParams, 'category', 'from');
    logger.info(logPrefix + `category=${params.category}, from=${params.from}`);
    return (
      <>
        <div>
          <Steps />
        </div>
      </>
    );
  }
}
