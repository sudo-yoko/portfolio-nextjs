import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/route-error-handler';
import logger from '@/presentation/(system)/logging-facade/logger';
import { ContactBody } from '@/presentation/contact/mvvm/models/contact2-types';
import { execute } from '@/presentation/contact/mvvm/models/usecase';

const logPrefix = '/contact/route.impl.ts: ';

export async function POST(req: Request): Promise<Response> {
  return withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const contactBody: ContactBody = await req.json();
    logger.info(logPrefix + `formData=${JSON.stringify(contactBody)}`);

    const result = await execute({ ...contactBody });
    if (result.tag === 'ok') {
      return new Response(null, { status: 200 });
    }
    if (result.tag === 'reject') {
      return new Response(JSON.stringify(result), { status: 400 });
    }
    // TODO: 到達可能か
    throw Error();
  }
}
