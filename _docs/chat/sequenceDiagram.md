 ```mermaid

sequenceDiagram
autonumber
participant C as Next.js Client-Side<br>(React)
participant S as Next.js Server-Side<br>(API route)
participant AD as AI adapter
participant A as AI Provider<br>(OpenAI, GeminiAI, etc...)
Note over A: mock<br>(Express)

C->>S: Request POST
Note right of C: fetch

S->>AD: call AI Adapter

AD->>A: Request POST
Note Right of AD: fetch

A-->>AD: Streaming Response
Note left of A: SSE(Server-Sent Events)

AD-->>S: Transform SSE → NDJSON,<br>＆ Return ReadableStream

S-->>C: Streaming Response
Note left of S: ReadableStream(NDJSON)

 ```


 
