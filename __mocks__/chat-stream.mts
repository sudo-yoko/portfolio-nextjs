//
// ストリーミングレスポンスを返すAI風モック
//
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const consolePrefix = '>>> ';
const logPrefix = '>>> chat-stream-mock: ';

const port = 3002;
const path = '/chat';

interface RequestBody {
  prompt: string;
  model: string;
}

const app = express();
app.use(cors());
app.use(express.json());
app.post(
  path,
  async (
    req: Request<undefined, string, RequestBody, undefined>,
    res: Response<string>,
  ): Promise<void> => {
    const { body } = req;
    console.log(
      logPrefix +
        `Request(inbound) -> prompt=${body.prompt}, model=${body.model}`,
    );

    const response: string =
      'きょう17日は、西～東日本では雨の降る所が多く、雷を伴って激しく降る所もあるでしょう。' +
      '落雷や突風などに注意してください。東北は雨が降り、北海道も夕方以降は雨が降る見込みです。' +
      'あす18日は、九州南部では激しい雷雨となる所がありそうです。' +
      '九州北部～北海道は雲が広がりやすく、所によりにわか雨がある見込みです。' +
      '沖縄はあすにかけて概ね晴れるでしょう。';

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    for (const chunk of response) {
      console.log(
        logPrefix + `Response(outbound) -> stream chunk sent: ${chunk}`,
      );
      res.write(chunk);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    res.end();
  },
);

app.listen(port, () => {
  console.log(
    consolePrefix +
      `Mock service running on http://localhost:${port} (chat-stream-mock)`,
  );
});
