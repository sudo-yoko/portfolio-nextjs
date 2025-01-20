interface IDebugLogger {
  log: (message: string) => void;
}

/**
 * 開発用のデバッグログ実装
 */
const development: IDebugLogger = {
  log: (message) => {
    console.debug(message);
  },
};

/**
 * 本番用のデバッグログ実装
 */
const production: IDebugLogger = {
  log: (message) => {
    void message;
  },
};

const loggerFactory = (): IDebugLogger => {
  if (process.env.NODE_ENV === 'development') {
    return development;
  }
  return production;
};
const debug = loggerFactory();

export default debug;
