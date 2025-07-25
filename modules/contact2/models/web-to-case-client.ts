import client from '@/modules/(system)/clients/proxy-client';
import { env } from '@/modules/(system)/env/env-helper';
import { withAxiosErrorHandlingAsync } from '@/modules/(system)/error-handlers/server-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import { ContactBody } from '@/modules/contact2/models/contact-model';
import 'server-only';

const logPrefix = 'web-to-case-client.ts: ';

export async function send(model: ContactBody): Promise<void> {
  // エラーハンドリングを追加して処理を実行する。
  return withAxiosErrorHandlingAsync(() => process());

  async function process() {
    const url = env('WEB_TO_CASE_URL');
    const body = new URLSearchParams(model).toString();
    logger.info(logPrefix + `Request(Outbound) -> url=${url}, body:${body}`);

    const res = await client.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    logger.info(logPrefix + `Response(Inbound) -> status=${res.status}`);
  }
}
