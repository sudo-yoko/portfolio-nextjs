import Steps from '@/app/contact2/steps';
import { SearchParams } from '@/modules/(system)/types/search-params';
import { handleRequest } from '@/modules/contact2/view-models/contact2-page-request-handler';

/**
 * お問い合わせフォーム ページコンポーネント
 */
export default async function Page(props: { searchParams?: SearchParams }) {
  await handleRequest(props.searchParams);
  return (
    <>
      <div>
        <Steps />
      </div>
    </>
  );
}
