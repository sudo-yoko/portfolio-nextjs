import { ChatRequest, send } from '@/presentation/chat/mvvm/models/chat-client';
import 'server-only';

const logPrefix = 'chat-route-request-handler.ts: ';

/**
 * APIルート処理
 */
export async function handleRequest(req: Request): Promise<Response> {
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
