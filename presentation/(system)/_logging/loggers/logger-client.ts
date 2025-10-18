//
// Server Actions を使ってクライアントからサーバーへログを送信する。
//
'use server';

import logger from '@/presentation/(system)/_logging/logging-facade/logger';

export async function logInfo(message: string) {
  logger.info(message);
}

export async function logError(message: string) {
  logger.error(message);
}
