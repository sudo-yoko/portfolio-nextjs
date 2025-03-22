'use server';

import logger from '@/modules/loggers/logger';

export async function info(message: string) {
  logger.info(message);
}

export async function error(message: string) {
  logger.error(message);
}
