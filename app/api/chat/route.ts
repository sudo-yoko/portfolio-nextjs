import { ChatRequest, send } from '@/modules/chat/openai-adapter';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
  const body: ChatRequest = await req.json();
  const stream = await send(body);
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
  });
}
