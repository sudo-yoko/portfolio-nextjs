'use server';

import { PagerAction, PagerActionResult } from '@/modules/(system)/pager/types';
import { fetch } from '@/modules/users/models/fetcher';
import { User, UsersQuery } from '@/modules/users/models/types';

export const pagerAction: PagerAction<User[], UsersQuery> = async (page, size, query) => {
  const { total, users } = await fetch(page, size, query);
  const result: PagerActionResult<User[]> = { total, items: users };
  return result;
};
