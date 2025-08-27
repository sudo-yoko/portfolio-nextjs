import { client } from '@/modules/(system)/clients/client';
import { env } from '@/modules/(system)/env/env-helper';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/server-error-handler';
import { UsersQuery } from '@/modules/users/models/users-model';
import 'server-only';

const logPrefix = 'user-client.ts: ';

type RES = {
  userId: string;
  userName: string;
};

export async function send(params: UsersQuery): Promise<RES> {
  return withErrorHandlingAsync(() => serverProcess());

  async function serverProcess(): Promise<RES> {
    const url = env('USERS_API');
    const res = await client.get<RES>(url, { params });
    return res.data;
  }
}
