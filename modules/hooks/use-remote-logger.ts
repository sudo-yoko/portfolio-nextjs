import { error } from '@/modules/loggers/remote-logger';
import 'client-only';
import { useEffect } from 'react';

export const useRemoteLogger = (message: string) => {
  useEffect(() => {
    error(message)
      .then(() => {
        console.info('Successfully sent error log to the server.');
      })
      .catch(() => {
        console.error('Failed to send error log to the server.');
      });
  });
};
