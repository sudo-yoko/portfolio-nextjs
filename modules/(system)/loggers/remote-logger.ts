'use server';

import logger from '@/modules/(system)/logging-facade/logger';

export async function logInfo(message: string) {
  logger.info(message);
}

export async function logError(message: string) {
  logger.error(message);
}
