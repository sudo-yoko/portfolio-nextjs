import Steps from '@/app/contact/mvvm/steps';
import { SearchParams } from '@/modules/(system)/types/search-params';
import { handleRequest } from '@/modules/contact/mvvm/view-models/contact2-page';

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
