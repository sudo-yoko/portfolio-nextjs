'use client';

import { Pager } from '@/modules/(system)/pager/models/pager-model';
import { createPager } from '@/modules/(system)/pager/offset-pager';
import { fetchAction } from '@/modules/users/models/fetch-action';
import { User } from '@/modules/users/models/types';
import { useEffect, useRef, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const pager = useRef<Pager<User[]>>(null);

  // Pagerインスタンスを1度だけ作成する（初期化）
  if (!pager.current) {
    pager.current = createPager(fetchAction, { offset: 1, limit: 10, query: {} });
  }

  // 依存配列を空にして、マウント時に一度だけ実行する
  useEffect(() => {
    pager.current?.current().then((p) => setUsers(p.items));
  }, []);

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
