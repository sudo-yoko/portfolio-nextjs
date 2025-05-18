import { ChatRequest } from '@/modules/chat/model-api';
import 'client-only';

/**
 * AIチャットAPIクライアント。APIルート(BFF層)の呼び出し。
 * axiosだとストリーミング形式のレスポンスを使った差分レンダリングができなかったので、fetchAPIを使用。
 */
export async function send(prompt: string, aiModel: string): Promise<Response> {
  const body: ChatRequest = { prompt, aiModel };
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  return res;
}
