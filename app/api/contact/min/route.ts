import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/route-error-handler';
import logger from '@/presentation/(system)/logging/logger.s';
import { hasError } from '@/presentation/(system)/validation/validation.helper';
import { send } from '@/presentation/contact/min/modules/contact-client';
import { ContactBody } from '@/presentation/contact/min/modules/contact-types';
import { validate } from '@/presentation/contact/min/modules/contact-validator';

const logPrefix = '/contact/min/route.ts: ';

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
