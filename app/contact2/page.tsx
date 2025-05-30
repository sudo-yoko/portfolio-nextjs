import Steps from '@/app/contact2/steps';
import { serverProcess } from '@/modules/contact2/view-models/page-handler';
import { SearchParams } from '@/modules/types/search-params';

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
