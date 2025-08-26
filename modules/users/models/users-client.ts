import 'server-only';
import { Query, User } from './users-model';
import { env } from '@/modules/(system)/env/env-helper';

const logPrefix = 'user-client.ts: '

export async function send(query: Query): Promise<User> {
    const url = env('USERS_API');

}