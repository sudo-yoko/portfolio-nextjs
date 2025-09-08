//import client from '@/modules/(system)/clients/proxy-client';
import { client } from '@/modules/(system)/clients/client';
import { env } from '@/modules/(system)/env/env-helper';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/server-error-handler';
import logger from '@/modules/(system)/logging-facade/logger';
import { FormData } from '@/modules/(system)/types/form-data';
import { FormKeys } from '@/modules/contact/model';
import 'server-only';

const logPrefix = 'web-to-case-client.ts: ';

export async function send(formData: FormData<FormKeys>): Promise<void> {
  return withErrorHandlingAsync(() => func());

  async function func() {
    const url = env('WEB_TO_CASE_URL');
    const body = new URLSearchParams(formData).toString();
    logger.info(logPrefix + `Request(Outbound) -> url=${url}, formData:${body}`);

    //try {
    const res = await client.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    logger.info(logPrefix + `Response(Inbound) -> status=${res.status}`);
    //} catch (error) {
    // ステータスが200以外の場合は、axiosが例外をスローする
    //  if (axios.isAxiosError(error) && error.response) {
    //    logger.error(logPrefix + `Response(Inbound) -> status=${error.response.status}`);
    //  }
    //  throw error;
    //}
  }
}
