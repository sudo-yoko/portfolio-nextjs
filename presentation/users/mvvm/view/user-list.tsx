'use client';

import { User } from '@/presentation/users/min/models/users-types';

export default function UserList({ users }: { users: User[] }) {
  return (
    <div>
      {users.length > 0 && (
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
      )}
    </div>
  );
}
