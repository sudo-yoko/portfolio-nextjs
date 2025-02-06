'use server';

import { Level } from '@/modules/loggers/ILogger';
import logger from '@/modules/loggers/logger';

export async function remoteLogger(
  level: Level,
  logPrefix: string,
  message: string,
) {
  switch (level) {
    case Level.Info:
      info(logPrefix, message);
      break;
    case Level.Error:
      error(logPrefix, message);
      break;
    case Level.Warn:
      break;
  }
}

async function info(logPrefix: string, message: string) {
  logger.info(logPrefix, message);
}

async function error(logPrefix: string, message: string) {
  logger.error(logPrefix, message);
}
