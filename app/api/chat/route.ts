import { ChatRequest } from '@/app/api/chat/model';
import debug from '@/modules/loggers/logger-debug';
import logger from '@/modules/logging-facade/logger';
import { NextRequest } from 'next/server';

const logPrefix = '/api/chat/route.ts: ';

/**
 * このAPIルートはBFF層(Backend For Frontend)の位置づけです。
 * バックエンドAPIの呼び出しをサーバーサイドから行い、APIからのストリーム形式のレスポンスを中継してクライアントに転送します。
 * サーバーアクションだとストリーム形式のレスポンスに対応できないため、APIルートを使用しています。
 */
export async function POST(req: NextRequest): Promise<Response> {
  const body: ChatRequest = await req.json();
  logger.info(
    logPrefix +
      `Request(inbound) -> prompt=${body.prompt}, aiModel=${body.aiModel}`,
  );

  const encoder = new TextEncoder();
  const response: string =
    'きょう17日は、西～東日本では雨の降る所が多く、雷を伴って激しく降る所もあるでしょう。' +
    '落雷や突風などに注意してください。東北は雨が降り、北海道も夕方以降は雨が降る見込みです。' +
    'あす18日は、九州南部では激しい雷雨となる所がありそうです。' +
    '九州北部～北海道は雲が広がりやすく、所によりにわか雨がある見込みです。' +
    '沖縄はあすにかけて概ね晴れるでしょう。';

  // ストリームの準備
  const stream: ReadableStream = new ReadableStream({
    // クライアント側でレスポンスボディの読み取りを行うと開始される処理
    start: async function (controller) {
      for (const chunk of response) {
        debug(chunk);
        controller.enqueue(encoder.encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      controller.close();
    },
  });

  // ストリームをレスポンス
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream: charset=utf-8',
      //'Transfer-Encoding': 'chunked',
    },
  });
}
