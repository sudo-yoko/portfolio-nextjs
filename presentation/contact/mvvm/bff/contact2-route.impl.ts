//
// お問い合わせフォーム BFF
// (Route Handlers を使った実装)
//
import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/route-error-handler';
import logger from '@/presentation/(system)/logging-facade/logger';
import { hasError } from '@/presentation/(system)/validators/validator';
import { send } from '@/presentation/contact/mvvm/models/contact2-client';
import { ContactBody } from '@/presentation/contact/mvvm/models/contact2-types';
import { validate } from '@/presentation/contact/mvvm/models/contact2-validator';

const logPrefix = 'contact2-route.impl.ts: ';

export async function POST(req: Request): Promise<Response> {
  return withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const contactBody: ContactBody = await req.json();
    logger.info(logPrefix + `formData=${JSON.stringify(contactBody)}`);

    const result = validate(contactBody);
    logger.info(logPrefix + `errors=${JSON.stringify(result)}`);

    if (hasError(result)) {
      return new Response(JSON.stringify(result), { status: 400 });
    }

    await send(contactBody);
    return new Response(null, { status: 200 });
  }
}
