import { client } from '@/presentation/(system)/clients/client';
import { env } from '@/presentation/(system)/env/env-validated.s';
import { withErrorHandlingAsync } from '@/presentation/(system)/error-handlers/server-error-handler';
import { Users, UsersQuery } from '@/presentation/users/min/models/users-types';
import 'server-only';

type RES = {
  total: number;
  users: {
    userId: string;
    userName: string;
  }[];
};

export async function send(offset: number, limit: number, query: UsersQuery): Promise<Users> {
  return withErrorHandlingAsync(() => func());

  async function func(): Promise<Users> {
    const url = env('USERS_API');
    const res = await client.get<RES>(url, { params: { offset, limit, ...query } });
    return { ...res.data };
  }
}
