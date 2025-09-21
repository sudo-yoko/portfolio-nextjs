import { withAuthAsync } from '@/modules/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/route-error-handler';
import { FetchPageResult } from '@/presentation/(system)/pagination/mvvm/models/types';
import { send } from '@/presentation/users/mvvm/models/users-client';
import { User, UsersQuery } from '@/presentation/users/mvvm/models/users-types';
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
