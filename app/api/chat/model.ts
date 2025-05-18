// APIモデルの定義

/**
 * リクエストボディ
 */
export interface ChatRequest {
  prompt: string;
  aiModel: string;
}
