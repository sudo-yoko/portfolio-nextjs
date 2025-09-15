'use client';

import { ErrorHandler } from '@/app/(system)/error-handler';
import { Pagination } from '@/app/(system)/pagination/pagination';
import { withErrorHandlingAsync } from '@/modules/(system)/error-handlers/client-error-handler';
import { createPager } from '@/modules/(system)/pager/pager';
import { Pager } from '@/modules/(system)/pager/types';
import { FormData } from '@/modules/(system)/types/form-data';
import { fetch } from '@/modules/users/models/users-fetcher';
import { FormKeys, User, Users, UsersQuery } from '@/modules/users/models/users-types';
import { useRef, useState } from 'react';

export default function UserList() {
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(false);
  const [formData, setFormData] = useState<FormData<FormKeys>>({ userName: '' });
  const [users, setUsers] = useState<User[]>([]);
  const pager = useRef<Pager<User[]>>(null);

  const initParam: UsersQuery = { userName: formData.userName };

  // Pagerインスタンスを1度だけ作成する（初期化）
  //if (!pager.current) {
  //  pager.current = createPager(pagerAction, { offset: 1, limit: 4, query: {} });
  //}

  // 依存配列を空にして、マウント時に一度だけ実行する
  //useEffect(() => {
  //  pager.current?.current().then((p) => setUsers(p.items));
  //}, []);

  function handleSearch() {
    //withErrorHandlingAsync(() => func(), setError);

    //async function func() {
    setSearch(true);
    //pager.current = createPager(fetch, { perPage: 4, query: { userName: formData.userName } });
    //const current = await pager.current.current();
    //setUsers(current.items);
    // Promiseチェーンで書く場合は、withErrorHandlingのエラーハンドリングは効果が無いので以下のように記述する
    /*
      pager.current
        .current()
        .then((p) => setUsers(p.items))
        .catch((_e) => setError(true));
        */
    //}
  }

  /*
  function handleNext() {
    pager.current
      ?.next()
      .then((p) => setUsers(p.items))
      .catch((_e) => setError(true));
  }

  function handlePrev() {
    pager.current
      ?.prev()
      .then((p) => setUsers(p.items))
      .catch((_e) => setError(true));
  }*/

  return (
    <>
      {error && <ErrorHandler />}

      <div>
        <div>
          <div>
            <div>名前</div>
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
          <Pagination<User[], UsersQuery>
            fetch={fetch}
            fetchArgs={{ perPage: 4, query: initParam }}
            setItems={setUsers}
          />
        )}
        {/** ページネーションコンポーネント */}
        
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300">ID</th>
              <th className="border border-gray-300">名前</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.userId}>
                  <td className="border border-gray-300">{user.userId}</td>
                  <td className="border border-gray-300">{user.userName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
