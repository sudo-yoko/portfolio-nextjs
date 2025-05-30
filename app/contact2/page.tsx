import Steps from '@/app/contact2/steps';
import { SearchParams } from '@/modules/(system)/types/search-params';
import { serverProcess } from '@/modules/contact2/view-models/page-handler';

/**
 * お問い合わせフォーム ページコンポーネント
 */
export default async function Page(props: { searchParams?: SearchParams }) {
  await serverProcess(props.searchParams);
  return (
    <>
      <div>
        <Steps />
      </div>
    </>
  );
}
