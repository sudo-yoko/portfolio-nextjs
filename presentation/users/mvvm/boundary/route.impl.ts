import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/route-error-handler';
import { FetchPageResult } from '@/presentation/(system)/pagination/mvvm/models/types';
import { BoundaryResult, ok } from '@/presentation/(system)/types/boundary-result';
import { send } from '@/presentation/users/mvvm/bff/users-client';
import { User, UsersQuery } from '@/presentation/users/mvvm/models/users-types';

interface ReqBody {
  offset: number;
  limit: number;
  query: UsersQuery;
}

export async function POST(req: Request): Promise<Response> {
  return await withErrorHandlingAsync(() => func());

  async function func() {
    const reqBody: ReqBody = await req.json();
    const { offset, limit, query } = reqBody;
    const { total, users } = await send(offset, limit, query);
    const body: FetchPageResult<User[]> = { items: users, total };
    const resBody: BoundaryResult<FetchPageResult<User[]>> = ok(body);
    return new Response(JSON.stringify(resBody), { status: 200 });
  }
}
