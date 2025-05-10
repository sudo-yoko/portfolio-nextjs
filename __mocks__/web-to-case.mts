//
// Salesforce Web-to-Case エンドポイントのモック
//
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const port = 3001;
const path = '/servlet/servlet.WebToCase';

const consolePrefix = '>>> ';
const logPrefix = '>>> web-to-case-mock: ';

// フォームデータ
interface FormData {
  name: string;
  email: string;
  body: string;
}

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.post(
  path,
  async (req: Request<undefined, undefined, FormData>, res: Response<void>) => {
    const body = req.body;
    console.log(
      logPrefix + `Request(Inbound) -> formData=${JSON.stringify(body)}`,
    );

    // 1秒待機
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    const status = 200;
    console.log(logPrefix + `Response(Outbound) -> status=${status}`);
    res.sendStatus(status);
  },
);

app.listen(port, () => {
  console.log(
    consolePrefix +
      `Mock service running on http://localhost:${port} (web-to-case-mock)`,
  );
});
