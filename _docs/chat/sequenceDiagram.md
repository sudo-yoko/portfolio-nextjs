 ```mermaid

sequenceDiagram
participant C as Next.js Client-Side<br>(React)
participant S as Next.js Server-Side<br>(API route)
participant AD as AI adapter
participant A as AI Provider<br>(OpenAI, GeminiAI, etc...)
Note over A: mock

C->>S: 1. Request POST
Note right of C: fetch

S->>AD: 2. call AI Adapter

AD->>A: 3. Request POST
Note Right of AD: fetch

A->>AD: 4. Streaming Response
Note left of A: SSE(Server-Sent Events)

AD->>S: 5. Transform SSE → NDJSON,<br>＆ Return ReadableStream

S->>C: 6. Streaming Response
Note left of S: ReadableStream(NDJSON)

 ```


 
