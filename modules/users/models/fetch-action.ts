'use server';

import { PageFetcher } from '@/modules/(system)/pager/models/pager-model';
import { fetch } from '@/modules/users/models/fetcher';
import { User, UsersQuery } from '@/modules/users/models/types';

export const fetchAction: PageFetcher<User[], UsersQuery> = async (offset, limit, query) => {
  return fetch(offset, limit, query);
};
