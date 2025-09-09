import { handleRequest } from '@/modules/users/models/users-route-request-handler';

export async function GET(req: Request): Promise<Response> {
  return await handleRequest(req);
}
