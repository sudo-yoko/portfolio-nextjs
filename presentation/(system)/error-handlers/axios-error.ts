import { stringify } from '@/presentation/(system)/error-handlers/stringify-error';
import logger from '@/presentation/(system)/logging-facade/logger';
import axios from 'axios';
import 'server-only';

const logPrefix = 'axios-error.ts: ';

/**
 * Axios 固有のエラーを処理する
 */
export function handleAxiosError(error: unknown): void {
  // axiosのエラーの場合
  // ステータスが200以外の場合は、axiosが例外をスローする
  // 200以外で例外をスローしないようにしたい場合は、リクエスト時に設定する。
  if (axios.isAxiosError(error)) {
    const description: string[] = [];
    description.push('Axios Error');
    if (error.response) {
      description.push(`Response(Inbound) -> status=${error.response.status}, data=${error.response.data}`);
    }
    logger.error(logPrefix + stringify(error, description.join(': ')).all);
  }
}
