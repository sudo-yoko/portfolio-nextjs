import { logError } from '@/presentation/(system)/loggers/logger-client';
import 'client-only';
import { useEffect } from 'react';

export const useRemoteLogger = (message: string) => {
  useEffect(() => {
    logError(message)
      .then(() => {
        console.info('Successfully sent error log to the server.');
      })
      .catch(() => {
        console.error('Failed to send error log to the server.');
      });
  });
};
