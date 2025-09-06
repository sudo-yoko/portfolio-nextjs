'use client';

import { InputValues } from '@/modules/(system)/types/input-values';
import { createPager } from '@/modules/(system)/pager/pager';
import { Pager } from '@/modules/(system)/pager/types';
import { pagerAction } from '@/modules/users/models/pager-action';
import { InputName, User } from '@/modules/users/models/types';
import { useRef, useState } from 'react';

export default function UserList() {
  const [inputValues, setInputValues] = useState<InputValues<InputName>>({ userName: '' });
  const [users, setUsers] = useState<User[]>([]);
  const pager = useRef<Pager<User[]>>(null);

  // Pagerインスタンスを1度だけ作成する（初期化）
  //if (!pager.current) {
  //  pager.current = createPager(pagerAction, { offset: 1, limit: 4, query: {} });
  //}

  // 依存配列を空にして、マウント時に一度だけ実行する
  //useEffect(() => {
  //  pager.current?.current().then((p) => setUsers(p.items));
  //}, []);

  function handleSearch() {
    pager.current = createPager(pagerAction, { perPage: 4, query: { userName: inputValues.userName } });
    pager.current.current().then((p) => setUsers(p.items));
  }

  function handleNext() {
    pager.current?.next().then((p) => setUsers(p.items));
  }

  function handlePrev() {
    pager.current?.prev().then((p) => setUsers(p.items));
  }

  return (
    <div>
      <div>
        <div>
          <div>名前</div>
          <div>
            <input
              type="text"
              value={inputValues.userName}
              onChange={(e) => setInputValues({ ...inputValues, userName: e.target.value })}
              className="w-80 border-2 border-gray-400"
            />
            <button type="button" onClick={handleSearch} className="rounded-lg bg-indigo-300 px-4 py-2">
              検索
            </button>
          </div>
        </div>
      </div>
      <button type="button" onClick={() => handlePrev()} className="rounded-lg bg-indigo-300 px-4 py-2">
        前へ
      </button>
      <button type="button" onClick={() => handleNext()} className="rounded-lg bg-indigo-300 px-4 py-2">
        次へ
      </button>
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
  );
}
