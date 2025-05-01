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
  subject: string;
  body: string;
}

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post(path, (req: Request<undefined, undefined, FormData>, res: Response<void>) => {});
