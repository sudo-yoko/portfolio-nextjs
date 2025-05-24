/**
 * OpenAIのAPIのモック。チャット応答をストリームとして返す。
 */
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const consolePrefix = '>>> ';
const logPrefix = '>>> openai-mock: ';

const port = 3002;
const path = '/openai/chat';

/**
 * リクエストボディ
 */
interface ReqBody {
  prompt: string;
  model: string;
}
/**
 * Server-Sent Eventsの data: フィールドに設定する値の型定義
 */
interface Data {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
  }[];
}

const app = express();

app.use(cors());
app.use(express.json());

app.post(
  path,
  async (
    req: Request<never, unknown, ReqBody, never>,
    res: Response<string>,
  ): Promise<void> => {
    console.log(
      logPrefix +
        `Request(inbound) -> prompt=${req.body.prompt}, model=${req.body.model}`,
    );

    const text: string =
      'きょう17日は、西～東日本では雨の降る所が多く、雷を伴って激しく降る所もあるでしょう。' +
      '落雷や突風などに注意してください。東北は雨が降り、北海道も夕方以降は雨が降る見込みです。' +
      'あす18日は、九州南部では激しい雷雨となる所がありそうです。' +
      '九州北部～北海道は雲が広がりやすく、所によりにわか雨がある見込みです。' +
      '沖縄はあすにかけて概ね晴れるでしょう。';
    const chars = Array.from(text);
    let index = 0;

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const interval = setInterval(() => {
      if (index >= chars.length) {
        res.write('data: [DONE]\n\n');
        clearInterval(interval);
        res.end();
        return;
      }

      const char = chars[index];
      console.log(
        logPrefix + `Response(outbound) -> stream chunk sent: ${char}`,
      );

      const data: Data = {
        id: '0',
        choices: [{ index: 0, message: { role: 'assistant', content: char } }],
      };
      res.write(`data: ${JSON.stringify(data)}\n\n`);

      index++;
    }, 100);

    res.on('close', () => {
      console.log(logPrefix + `切断されました。`);
      clearInterval(interval);
    });
  },
);

app.listen(port, () => {
  console.log(
    consolePrefix + `Mock service running on http://localhost:${port}${path}`,
  );
});
