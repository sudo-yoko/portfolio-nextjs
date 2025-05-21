export type ChunkType = 'data' | 'error';

export interface Chunk {
  type: ChunkType;
  value: string;
}

export const dataLabel = 'data: ';

export function dataChunk(value: string): Uint8Array {
  const chunk: Chunk = { type: 'data', value };
  return ndjson(chunk);
}

export function errChunk(value: string): Uint8Array {
  const chunk: Chunk = { type: 'error', value };
  return ndjson(chunk);
}

export function ndjson(chunk: Chunk): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(chunk) + '\n');
}
