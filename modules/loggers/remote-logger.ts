'use server';

import { Level } from '@/modules/loggers/ILogger';
import logger from '@/modules/loggers/logger';

export async function remoteLogger(
  level: Level,
  logPrefix: string,
  message: string,
) {
  if (level === Level.Info) info(logPrefix, message);
  else if (level === Level.Error) error(logPrefix, message);
}

async function info(logPrefix: string, message: string) {
  logger.info(logPrefix, message);
}

async function error(logPrefix: string, message: string) {
  logger.error(logPrefix, message);
}
