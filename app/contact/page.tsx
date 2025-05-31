import Contact from '@/app/contact/contact';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/server-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import {
  SearchParam,
  SearchParams,
} from '@/modules/(system)/types/search-params';

const logPrefix = 'app/contact/page.tsx: ';

/**
 * お問い合わせフォーム ページコンポーネント
 */
export default async function Page(props: { searchParams?: SearchParams }) {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => process());

  async function process() {
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
