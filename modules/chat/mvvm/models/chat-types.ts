export type ChunkType = 'data' | 'error';

export interface Chunk {
  type: ChunkType;
  value: string;
}
