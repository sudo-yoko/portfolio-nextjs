import { withAuthAsync } from '@/modules/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/route-error-handler';
import { FetchPageResult } from '@/modules/(system)/pagination/min/models/types';
import { send } from '@/modules/users/min/models/users-client';
import { User, UsersQuery } from '@/modules/users/min/models/users-types';
import 'server-only';

interface ReqBody {
  offset: number;
  limit: number;
  query: UsersQuery;
}

export async function handleRequest(req: Request): Promise<Response> {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const reqBody: ReqBody = await req.json();
    const { limit, offset, query } = reqBody;
    const { total, users } = await send(offset, limit, query);
    const resBody: FetchPageResult<User[]> = { total, items: users };
    return new Response(JSON.stringify(resBody), { status: 200 });
  }
}
