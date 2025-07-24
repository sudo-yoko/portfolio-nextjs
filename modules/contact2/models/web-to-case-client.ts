import client from '@/modules/(system)/clients/proxy-client';
import { env } from '@/modules/(system)/env/env-helper';
import logger from '@/modules/(system)/logging-facade/logger';
import { ContactBody } from '@/modules/contact2/models/contact-model';
import axios from 'axios';
import 'server-only';

const logPrefix = 'web-to-case-client.ts: ';

export async function send(model: ContactBody): Promise<void> {
  const url = env('WEB_TO_CASE_URL');
  const body = new URLSearchParams(model).toString();
  logger.info(logPrefix + `Request(Outbound) -> url=${url}, body:${body}`);

  try {
    const res = await client.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    logger.info(logPrefix + `Response(Inbound) -> status=${res.status}`);
  } catch (error) {
    // ステータスが200以外の場合は、axiosが例外をスローする
    if (axios.isAxiosError(error) && error.response) {
      logger.error(
        logPrefix + `Response(Inbound) -> status=${error.response.status}`,
      );
    }
    throw error;
  }
}
