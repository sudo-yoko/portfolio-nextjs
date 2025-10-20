import logger from '@/presentation/(system)/logging/logger.c';
import 'client-only';
import { useEffect } from 'react';

export const useRemoteLogger = (message: string) => {
  useEffect(() => {
    logger.errorAsync(message)
      .then(() => {
        console.info('Successfully sent error log to the server.');
      })
      .catch(() => {
        console.error('Failed to send error log to the server.');
      });
  });
};
