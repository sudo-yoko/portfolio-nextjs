//
// Customers APIモック
//
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const port = 3000;
const path = '/customers/:customerId';

// パスパラメーターの定義
interface PathParams {
  customerId: string;
}

// レスポンスボディの定義
interface ResBody {
  customerId: string;
  customerName: string;
}

// Expressアプリケーションのインスタンスを作成
const app = express();

// リクエストボディを自動的にJSONとして解析する
app.use(express.json());

// すべてのオリジンを許可する
app.use(cors());

// GETエンドポイント
app.get(path, (req: Request<PathParams, ResBody>, res: Response<ResBody>) => {
  const { params } = req;
  console.log(`PathParams: ${JSON.stringify(params)}`);

  const status = 200;
  const resBody: ResBody = {
    customerId: '12345',
    customerName: 'sudo yoko',
  };

  res.status(status).json(resBody);
});

app.listen(port, () => {
  console.log(`Mock service running on http://localhost:${port}`);
});
