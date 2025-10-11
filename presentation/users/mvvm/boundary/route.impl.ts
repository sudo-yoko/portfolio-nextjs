import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/route-error-handler';
import { execute } from '@/presentation/users/mvvm/models/usecase';
import { UsersQuery } from '@/presentation/users/mvvm/models/users-types';

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
    const result = await execute(offset, limit, query);
    return new Response(JSON.stringify(result), { status: 200 });
  }
}
