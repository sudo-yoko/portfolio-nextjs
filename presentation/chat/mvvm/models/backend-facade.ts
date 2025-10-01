import { ChatRequest } from '@/presentation/chat/mvvm/bff/chat-client';
import 'client-only';

export async function sendRequest(
  prompt: string,
  aiModel: string,
  signal: AbortSignal,
): Promise<Response> {
  const body: ChatRequest = { prompt, aiModel };
  const res = await fetch('/api/chat/mvvm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
    signal,
  });
  return res;
}
