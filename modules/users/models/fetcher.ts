import { send } from '@/modules/users/models/client';
import { Users, UsersQuery } from '@/modules/users/models/types';
import 'server-only';

export async function fetch(offset: number, limit: number, query: UsersQuery): Promise<Users> {
  const users = await send(offset, limit, query);
  return users;
}
