//import client from '@/modules/(system)/clients/proxy-client';
import { client } from '@/modules/(system)/clients/client';
import { env } from '@/modules/(system)/env/env-helper';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/server-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import { ContactBody } from '@/modules/contact/mvvm/models/contact2-types';
import 'server-only';

const logPrefix = 'contact2-client.ts: ';

export async function send(model: ContactBody): Promise<void> {
  // エラーハンドリングを追加して処理を実行する。
  return withErrorHandlingAsync(() => func());

  async function func() {
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
