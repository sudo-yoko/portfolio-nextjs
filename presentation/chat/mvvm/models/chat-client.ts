/**
 * OpenAI APIのインターフェースを、アプリケーションに合わせて変換する
 */
import { env } from '@/presentation/(system)/env/env-helper';
import { Chunk } from '@/presentation/chat/mvvm/models/chat-types';
import 'server-only';

const logPrefix = 'chat-client.ts: ';

export interface ChatRequest {
  prompt: string;
  aiModel: string;
}

export interface Data {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
  }[];
}

const dataLabel = 'data: ';

export async function send(req: ChatRequest, signal: AbortSignal): Promise<ReadableStream> {
  const url = env('OPEN_AI_API');
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(req),
    signal,
  });
  return new ReadableStream({
    start: async function (controller): Promise<void> {
      signal.addEventListener('abort', () => {
        console.log(logPrefix + 'abort検知');
        controller.close();
        return;
      });
      if (!res.body) {
        controller.enqueue(errChunk('no response body.'));
        return;
      }
      const reader = res.body.getReader();

      let isComplete = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          isComplete = true;
          break;
        }
        const decoder = new TextDecoder();
        const decoded = decoder.decode(value, { stream: true });
        //console.log(decoded);
        const lines = decoded.split('\n').filter((line) => line.trim() !== '');

        for (const line of lines) {
          if (!line.startsWith(dataLabel)) continue;

          const data = line.replace(dataLabel, '');
          if (data === '[DONE]') {
            isComplete = true;
            break;
          }
          const parsed: Data = JSON.parse(data);
          const content = parsed.choices[0].message.content;
          controller.enqueue(dataChunk(content));
        }
      }
      if (!isComplete) {
        controller.enqueue(errChunk('正常に完了しませんでした: [DONE]未到達'));
      }
      controller.close();
    },
  });
}

function dataChunk(value: string): Uint8Array {
  const chunk: Chunk = { type: 'data', value };
  return ndjson(chunk);
}

function errChunk(value: string): Uint8Array {
  const chunk: Chunk = { type: 'error', value };
  return ndjson(chunk);
}

function ndjson(chunk: Chunk): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(chunk) + '\n');
}
