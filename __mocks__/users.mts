import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const consolePrefix = '>>> ';

const port = 3003;
const path = '/users';

interface ReqQuery {
  offset: number;
  limit: number;
  userId?: string;
  userName?: string;
}

interface User {
  userId: string;
  userName: string;
}

interface ResBody {
  users: User[];
}

const app = express();

app.use(express.json());
app.use(cors());

/**
 * GET /users
 */
app.get(
  path,
  async (
    req: Request<never, ResBody, never, ReqQuery>,
    res: Response<ResBody>,
  ) => {
    const { method, url, query } = req;
    console.log(method, url);
    console.log(`query=${JSON.stringify(query)}`);

    const status = 200;
    const resBody: ResBody = {
      users: [
        { userId: '1', userName: 'user1' },
        { userId: '2', userName: 'user2' },
      ],
    };
    res.status(status).json(resBody);
  },
);

app.listen(port, () => {
  console.log(
    consolePrefix +
      `Mock service running on http://localhost:${port} (users-mock)`,
  );
});
