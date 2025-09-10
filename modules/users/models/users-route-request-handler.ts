import { withAuthAsync } from '@/modules/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/route-error-handler';
import 'server-only';

export async function handleRequest(_req: Request): Promise<Response> {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    return new Response(null, { status: 204 });
  }
}
