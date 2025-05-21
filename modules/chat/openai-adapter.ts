import { dataChunk, dataLabel, errChunk } from '@/modules/chat/model-api';
import { env } from '@/modules/env/env-helper';

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

export async function send(req: ChatRequest): Promise<ReadableStream> {
  const url = env('OPEN_AI_API');
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(req),
  });
  return new ReadableStream({
    start: async function (controller): Promise<void> {
      if (!res.body) {
        controller.enqueue(errChunk('no body'));
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
