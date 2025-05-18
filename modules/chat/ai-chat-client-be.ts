import { ChatRequest } from '@/modules/chat/model-api';
import { env } from '@/modules/env/env-helper';
import 'server-only';

/**
 * AIチャットAPIクライアント。バックエンドAPIの呼び出し。
 * axiosだとストリーミング形式のレスポンスを使った差分レンダリングができなかったので、fetchAPIを使用。
 */
export async function send(prompt: string, aiModel: string): Promise<Response> {
  const url = env('AI_CHAT_API');

  const body: ChatRequest = { prompt, aiModel };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  return res;
}
