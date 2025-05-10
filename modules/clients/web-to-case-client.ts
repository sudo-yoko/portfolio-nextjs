import client from '@/modules/clients/proxy-client';
import { FormData } from '@/modules/contact/model';
import { env } from '@/modules/env/env-helper';
import logger from '@/modules/logging-facade/logger';
import 'server-only';

const logPrefix = 'web-to-case-client.ts: ';

export async function send(formData: FormData): Promise<void> {
  const url = env('WEB_TO_CASE_URL');
  const body = new URLSearchParams(formData);
  logger.info(
    logPrefix + `Request(Outbound) -> url=${url}, formData:${body.toString()}`,
  );
  const res = await client.post(url, body.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  logger.info(logPrefix + `Response(Inbound) -> status=${res.status}`);
}
