import { handleRequest } from '@/modules/users/models/users-route';

export async function POST(req: Request): Promise<Response> {
  return await handleRequest(req);
}
