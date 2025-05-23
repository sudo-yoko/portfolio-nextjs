 ```mermaid

sequenceDiagram
autonumber
actor U as User
participant C as Next.js Client-Side<br>(React)
participant S as Next.js Server-Side<br>(API route)
participant AD as AI adapter
participant A as AI Provider<br>(OpenAI, GeminiAI, etc...)
Note over A: mock<br>(Express)

U->>C: 送信ボタン押下

rect rgb(191, 223, 255)
  Note over C: new AbortController
  C->>S: Request POST(fetch)<br>(キャンセル可能なリクエスト)  
end

Note over S: EventListener('abort')<br>(キャンセル時のイベントリスナー)

rect rgb(191, 223, 255)
  Note over S: new AbortController
  S->>AD: call AI adapter
  AD->>A: Request POST(fetch)<br>(キャンセル可能なリクエスト) 
end

A-->>AD: Server-Sent Events<br>(Streaming Response)

Note over AD: new ReadableStream
Note over AD: new AbortController
AD-->>C: ReadableStream

U->>C: キャンセルボタン押下
Note over C: AbortController
C->>S: AbortSignal
Note over S: EventListener('abort')<br>キャンセル時
Note over S: AbortController
S->>AD: AbortSignal
Note over AD: ReadableStream
Note over AD: AbortController
AD->>A: close
Note over A: EventListener('close')<br>(クライアントが接続を途中で切断時)


 ```
