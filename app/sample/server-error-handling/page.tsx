import type { SearchParam, SearchParams } from '@/modules/types/search-params';
import withErrorHandling from '@/modules/error-handlers/server-error-handler';

export default function Page(props: { searchParams: SearchParams }) {
  return withErrorHandling(() => serverProcess());
  function serverProcess() {
    return <div>server-error-handling.tsx</div>;
  }
}

export const dynamic = 'force-dynamic';
