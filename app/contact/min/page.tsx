import Contact from '@/presentation/contact/min/components/contact';
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/server-error-handler';
import logger from '@/presentation/(system)/logging/logger.s';
import { SearchParam, SearchParams } from '@/presentation/(system)/types/search-params';

const logPrefix = 'app/contact/page.tsx: ';

/**
 * お問い合わせフォーム ページコンポーネント
 */
export default async function Page(props: { searchParams?: SearchParams }) {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => func());

  async function func() {
    const params = await props.searchParams;
    logger.info(logPrefix + `searchParams=${JSON.stringify(params)}`);

    const para1: SearchParam = params?.['para1'];
    const para2: SearchParam = params?.['para2'];
    logger.info(logPrefix + `para1=${para1}, para2=${para2}`);

    return (
      <>
        <div>
          <Contact />
        </div>
      </>
    );
  }
}
