import { OffsetFetcher } from '@/modules/(system)/pager/pager';

type User = { userId: string; userName: string };
type UserQuery = { userId?: string; userName?: string };

const userFetcher: OffsetFetcher<User, UserQuery> = (user, query) => {
    
};
