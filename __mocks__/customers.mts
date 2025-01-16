import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const port = 3000;
const path = '/customers/:customer';

interface PathParams {
  customerId: string;
}

interface ResBody {
  customerId: string;
  customerName: string;
}

const app = express();

app.use(express.json());
app.use(cors());

app.get(path, (req: Request<PathParams, ResBody>, res: Response<ResBody>) => {
  const { params, query } = req;
  console.log(`PathParams: ${JSON.stringify(params)}`);
  console.log(`QueryParams: ${JSON.stringify(query)}`);

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
