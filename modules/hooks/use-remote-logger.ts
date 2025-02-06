import { Level } from '@/modules/loggers/ILogger';
import { remoteLogger } from '@/modules/loggers/remote-logger';
import 'client-only';
import { useEffect } from 'react';

export const useRemoteLogger = (
  level: Level,
  logPrefix: string,
  message: string,
) => {
  useEffect(() => {
    remoteLogger(level, logPrefix, message)
      .then(() => {
        console.info('Successfully sent log to the server.');
      })
      .catch(() => {
        console.error('Failed to send log to the server.');
      });
  });
};
