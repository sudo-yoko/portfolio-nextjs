'use client';

import { ErrorHandler } from '@/app/(system)/error-handler';
import { Pagination } from '@/app/(system)/pagination/pagination';
import { FormData } from '@/modules/(system)/types/form-data';
import { fetch } from '@/modules/users/models/users-fetcher';
import { FormKeys, User, UsersQuery } from '@/modules/users/models/users-types';
import { useCallback, useMemo, useState } from 'react';

export default function UserList() {
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(false);
  const [formData, setFormData] = useState<FormData<FormKeys>>({ userName: '' });
  const [users, setUsers] = useState<User[]>([]);

  const initialPage = 1;
  const perPage = 4;
  const { userName } = formData; // 各レンダーで作り直される“その回のスナップショット”
  const queryMemo: UsersQuery = useMemo(() => ({ userId: '', userName }), [userName]);
  const fetchCallback = useCallback(fetch, [queryMemo]);

  function handleSearch() {
    setSearch(true);
  }

  return (
    <>
      {error && <ErrorHandler />}
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
        {search && (
          <Pagination
            fetchCallback={fetchCallback}
            initialPage={initialPage}
            perPage={perPage}
            queryMemo={queryMemo}
            setItems={setUsers}
            setError={setError}
          />
        )}
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
