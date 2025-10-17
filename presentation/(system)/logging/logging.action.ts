//
// Server Actions を使ってクライアントからサーバーへログを送信する。
//
'use server';

import logger from '@/presentation/(system)/logging/logger.s';

export async function logInfo(message: string) {
  logger.info(message);
}

export async function logError(message: string) {
  logger.error(message);
}

export async function logDebug(message: string) {
  logger.debug(message);
}
