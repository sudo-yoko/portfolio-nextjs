import { ChatRequest } from '@/modules/chat/openai-adapter';
import 'client-only';

export async function send(
  prompt: string,
  aiModel: string,
  signal: AbortSignal,
): Promise<Response> {
  const body: ChatRequest = { prompt, aiModel };
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
    signal,
  });
  return res;
}
