 ```mermaid

sequenceDiagram
participant C as Next.js Client-Side<br>(React)
participant S as Next.js Server-Side<br>(API route)
participant A as AI Provider<br>(OpenAI, GeminiAI, etc...)
Note over A: mock

C->>S: 1. Request POST
Note right of C: fetch
S->>A: 2. Request POST
Note Right of S: fetch
A->>S: 3. Response(ReadableStream)
Note left of A: SSE(Server-Sent Events)
S->>C: 4. Response(ReadbleStream)
Note left of S: NDJSON

 ```


 
