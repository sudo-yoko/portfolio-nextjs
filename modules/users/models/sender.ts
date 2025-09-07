import { client } from '@/modules/(system)/clients/client';
import { env } from '@/modules/(system)/env/env-helper';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/server-error-handler';
import { Users, UsersQuery } from '@/modules/users/models/types';
import 'server-only';

type RES = {
  total: number;
  users: {
    userId: string;
    userName: string;
  }[];
};

export async function send(offset: number, limit: number, query: UsersQuery): Promise<Users> {
  return withErrorHandlingAsync(() => send());

  async function send(): Promise<Users> {
    const url = env('USERS_API');
    const res = await client.get<RES>(url, { params: { offset, limit, ...query } });
    return { ...res.data };
  }
}
