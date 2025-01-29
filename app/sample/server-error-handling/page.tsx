import { withErrorHandling } from '@/modules/error-handlers/server-error-handler';

export default function Page() {
  return withErrorHandling(() => serverProcess());
  function serverProcess() {
    return <div>server-error-handling.tsx</div>;
  }
}

export const dynamic = 'force-dynamic';
