import { ChatRequest, send } from '@/modules/chat/models/openai-adapter';

const logPrefix = '/app/api/chat/route.ts: ';

export async function POST(req: Request): Promise<Response> {
  const abort = new AbortController();

  req.signal.addEventListener('abort', () => {
    console.log(logPrefix + 'abort検知');
    abort.abort();
  });

  const body: ChatRequest = await req.json();
  const stream = await send(body, abort.signal);
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
  });
}

// ReadableStreamを使用するため、Node.js Runtimeを使用する必要がある
export const runtime = 'nodejs';
