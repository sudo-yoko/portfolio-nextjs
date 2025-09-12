import { withAuthAsync } from '@/modules/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/route-error-handler';
import { FetchPageResult } from '@/modules/(system)/pager/types';
import { send } from '@/modules/users/models/users-client';
import { User, UsersQuery } from '@/modules/users/models/users-types';
import 'server-only';

interface Body {
  offset: number;
  limit: number;
  query: UsersQuery;
}

export async function handleRequest(req: Request): Promise<Response> {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const body: Body = await req.json();
    const { limit, offset, query } = body;
    const { total, users } = await send(offset, limit, query);
    const result: FetchPageResult<User[]> = { total, items: users };
    return new Response(JSON.stringify(result), { status: 200 });
  }
}
