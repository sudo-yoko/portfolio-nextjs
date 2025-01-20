interface DebugLogger {
    log: (message: string) => void;
}

function loggerFactory(): DebugLogger {
    if (process.env.NODE_ENV === 'development') {
        return { log: (message) => console.debug(message) }
    }
    return { log: (message) => console.debug(void message) }
}

const debug = loggerFactory();
export default debug;