import { send } from '@/modules/chat/ai-chat-client-be';
import { ChatRequest } from '@/modules/chat/model-api';
import logger from '@/modules/logging-facade/logger';
import { NextRequest } from 'next/server';

const logPrefix = '/api/chat/route.ts: ';

/**
 * このAPIルートはBFF層(Backend For Frontend)の位置づけです。
 * バックエンドAPIの呼び出しをサーバーサイドから行い、APIからのストリーム形式のレスポンスを中継してクライアントに転送します。
 * サーバーアクションだとストリーム形式のレスポンスに対応できなかったため、APIルートを使用しています。
 */
export async function POST(req: NextRequest): Promise<Response> {
  const body: ChatRequest = await req.json();
  logger.info(
    logPrefix +
      `Request(inbound) -> prompt=${body.prompt}, aiModel=${body.aiModel}`,
  );

  // バックエンドAPI呼び出し
  const res = await send(body.prompt, body.aiModel);

  // ストリームオブジェクトの作成
  const stream: ReadableStream = new ReadableStream({
    // クライアント側でレスポンスボディの読み取りを行うと開始される処理
    start: async function (controller) {
      if (!res.body) {
        return;
      }
      // レスポンスボディをストリームとして読み取る
      const reader = res.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // チャンクの単位でクライアントに転送する
        controller.enqueue(value);
      }
      // ストリームの送信を終了する
      controller.close();
    },
  });

  // ストリームオブジェクトをレスポンスする
  // これにより、クライアントはサーバーからのデータをストリームで受け取ることができる
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      //'Transfer-Encoding': 'chunked',
    },
  });
}
