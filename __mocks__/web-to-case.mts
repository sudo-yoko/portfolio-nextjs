//
// Salesforce Web-to-Case エンドポイントのモック
//
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const port = 3001;
const path = '/servlet/setvlet.WebToCase';

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
  (req: Request<undefined, undefined, FormData>, res: Response<void>) => {
    const body = req.body;
    console.log(
      `web-to-case-mock: Inbound Request -> formData=${JSON.stringify(body)}`,
    );
    res.sendStatus(200);
  },
);

app.listen(port, () => {
  console.log(`Mock service running on http://localhost:${port}`);
});
