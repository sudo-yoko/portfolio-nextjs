// method
export const POST = 'POST';
export const GET = 'GET';

// headers
const CONTENT_TYPE = 'Content-Type';
const ACCEPT = 'Accept';
const APPLICATION_JSON = 'application/json';
const APPLICATION_FORM = 'application/x-www-form-urlencoded';
const TEXT_EVENT_STREAM = 'text/event-stream';
const CHARSET_UTF8 = 'charset=utf-8';

/**
 * 'Content-Type': 'application/json; charset=utf-8'
 */
export const CONTENT_TYPE_APPLICATION_JSON_UTF8 = {
  [CONTENT_TYPE]: `${APPLICATION_JSON}; ${CHARSET_UTF8}`,
} as const satisfies HeadersInit;

/**
 * 'Content-Type': 'application/x-www-form-urlencoded'
 */
export const CONTENT_TYPE_APPLICATION_FORM = {
  [CONTENT_TYPE]: APPLICATION_FORM,
} as const satisfies HeadersInit;

/**
 * 'Content-Type': 'text/event-stream; charset=utf-8'
 */
export const CONTENT_TYPE_TEXT_EVENT_STREAM_UTF8 = {
  [CONTENT_TYPE]: `${TEXT_EVENT_STREAM}; ${CHARSET_UTF8}`,
};

/**
 * 'Accept': 'application/json'
 */
export const ACCEPT_APPLICATION_JSON = {
  [ACCEPT]: APPLICATION_JSON,
} as const satisfies HeadersInit;
