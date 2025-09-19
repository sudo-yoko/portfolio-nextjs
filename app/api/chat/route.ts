import { handleRequest } from '@/modules/chat/mvvm/models/chat-route-request-handler';

// ReadableStreamを使用するため、Node.js Runtimeを使用する必要がある
export const runtime = 'nodejs';

export async function POST(req: Request): Promise<Response> {
  return await handleRequest(req);
}
