import { handleRequest } from '@/presentation/users/min/models/users-route';

export async function POST(req: Request): Promise<Response> {
  return await handleRequest(req);
}
