 ```mermaid

sequenceDiagram
autonumber

actor U as User
participant C as Next.js Client-Side<br>(React)
participant S as Next.js Server-Side<br>(API route)
participant AD as AI adapter
participant A as AI Provider<br>(OpenAI, GeminiAI, etc...)
Note over A: mock(Express)

U->>C: キャンセルボタン押下
Note over C: AbortController.abort()

C->>S: AbortSignal-1
Note over S: EventListener('abort')
Note over S: AbortController.abort()

S->>A: AbortSignal-2
A-->>AD: AbortSignal-2

rect rgb(223, 239, 255)
Note over C,AD: ReadableStream
Note over C,AD: EventListener('abort')

AD->>A: ReadableStreamDefaultController.close()
S->>A: ReadableStreamDefaultController.close()
C->>A: ReadableStreamDefaultController.close()
end

Note over A: EventListener('close')
A-->>C: done

 ```
