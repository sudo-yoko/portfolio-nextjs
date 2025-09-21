import Steps from '@/presentation/contact/mvvm/views/steps';
import { SearchParams } from '@/presentation/(system)/types/search-params';
import { handleRequest } from '@/presentation/contact/mvvm/view-models/contact2-page';

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
