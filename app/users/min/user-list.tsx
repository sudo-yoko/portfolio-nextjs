'use client';

import { Pagination } from '@/app/(system)/pagination/min/pagination';
import { FormData } from '@/modules/(system)/types/form-data';
import { fetch } from '@/modules/users/min/models/users-fetcher';
import { FormKeys, User, UsersQuery } from '@/modules/users/min/models/users-types';
import { useState } from 'react';

const initialPage = 1;
const perPage = 4;

export default function UserList() {
  const [search, setSearch] = useState(false);
  const [formData, setFormData] = useState<FormData<FormKeys>>({ userName: '' });
  const [users, setUsers] = useState<User[]>([]);
  const { userName } = formData; // 各レンダーで作り直される“その回のスナップショット”
  const [query, setQuery] = useState<UsersQuery>({ userId: '', userName });
  //const queryMemo: UsersQuery = useMemo(() => ({ userId: '', userName:'' }), []);

  function handleSearch() {
    setQuery({ ...query, userName: formData.userName });
    setSearch(true);
  }

  return (
    <>
      <div>
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
          </div>
        </div>
        {/** ページネーションコンポーネント */}
        <Pagination
          search={search}
          fetch={fetch}
          initialPage={initialPage}
          perPage={perPage}
          query={query}
          setItems={setUsers}
        />
        {/** 一覧 */}
        {users.length > 0 && <List users={users} />}
      </div>
    </>
  );
}

function List({ users }: { users: User[] }) {
  return (
    <div>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300">ID</th>
            <th className="border border-gray-300">名前</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td className="border border-gray-300">{user.userId}</td>
              <td className="border border-gray-300">{user.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
