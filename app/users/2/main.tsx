'use client';

import { Pagination } from '@/app/(system)/pagination/2/pagination';
import UserList from '@/app/users/2/user-list';
import { FormData } from '@/modules/(system)/types/form-data';
import { fetch } from '@/modules/users/models/users-fetcher';
import { FormKeys, User, UsersQuery } from '@/modules/users/models/users-types';
import { useCallback, useState } from 'react';

export function Main() {
  const [search, setSearch] = useState(false);
  const [formData, setFormData] = useState<FormData<FormKeys>>({ userName: '' });
  const { userName } = formData;
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<UsersQuery>({ userId: '', userName });
  const fetchCallback = useCallback(fetch, [fetch]);

  const initialPage = 1;
  const perPage = 4;

  function handleSearch() {
    setQuery({ ...query, userName: formData.userName });
    setSearch(true);
  }

  return (
    <div>
      <div>
        <div>検索条件を入力してください。</div>
        <div>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            className="w-80 border-2 border-gray-400"
          />
          <button type="button" onClick={handleSearch} className="rounded-lg bg-indigo-300 px-4 py-2">
            検索
          </button>
        </div>
        <div>
          <Pagination
            search={search}
            fetchCallback={fetchCallback}
            initialPage={initialPage}
            perPage={perPage}
            query={query}
            setItems={setUsers}
          >
            <UserList users={users} />
          </Pagination>
        </div>
      </div>
    </div>
  );
}
