import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const logPrefix = '>>> ';

const port = 3003;
const path = '/users';

interface ReqQuery {
  offset: string;
  limit: string;
  userId?: string;
  userName?: string;
}

interface ResBody {
  total: string;
  users: User[];
}

interface User {
  id: string;
  name: string;
}

const app = express();

app.use(express.json());
app.use(cors());

/**
 * GET /users
 */
app.get(path, async (req: Request<never, ResBody, never, ReqQuery>, res: Response<ResBody>) => {
  const { method, url, query } = req;
  const { offset, limit } = query;
  console.log(method, url);
  console.log(`query=${JSON.stringify(query)}`);

  // テストデータを作成
  const total = 10;
  const users: User[] = [];
  for (let i = 0; i < total; i++) {
    const id = String(i).padStart(5, '0');
    const name = 'テスト 太郎' + i;
    users.push({ id, name });
  }

  //
  const segment = users.slice(Number(offset), Number(offset) + Number(limit));
  console.log(`users=${JSON.stringify(segment, null, 2)}`);

  const status = 200;
  const resBody: ResBody = {
    total: String(total),
    users: segment,
  };
  res.status(status).json(resBody);
});

app.listen(port, () => {
  console.log(logPrefix + `Mock service running on http://localhost:${port} (users-mock)`);
});
