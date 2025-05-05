import Main from '@/app/contact/main';
import { withErrorHandling } from '@/modules/error-handlers/server-error-handler';
import logger from '@/modules/logging-facade/logger';
import { SearchParams } from '@/modules/types/search-params';

const logPrefix = 'app/contact/page.tsx: ';

/**
 * お問い合わせフォーム ページコンポーネント
 */
export default async function Page(props: { searchParams?: SearchParams }) {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandling(() => process());

  async function process() {
    const searchParams = await props.searchParams;
    logger.info(logPrefix + `searchParams=${JSON.stringify(searchParams)}`);

    return (
      <>
        <div>
          <Main />
        </div>
      </>
    );
  }
}
