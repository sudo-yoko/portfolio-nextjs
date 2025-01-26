import type { SearchParam, SearchParams } from '@/modules/types/search-params';

export default async function Page(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const para1: SearchParam = params['para1'];
  const para2: SearchParam = params['para2'];
  return (
    <div>
      クエリパラメーターは、para1={para1}とpara2={para2}です。
    </div>
  );
}
