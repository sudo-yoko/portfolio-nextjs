 ```mermaid

sequenceDiagram
participant C as Next.js Client-Side<br>(React)
participant S as Next.js Server-Side<br>(API route)
participant A as AI Provider<br>(OpenAI, GeminiAI, etc...)
Note over A: mock

C->>S: 1. Request POST
Note left of S: fetch
S->>A: 2. Request POST
Note left of A: fetch
A->>S: 3. Response(Stream)
Note left of A: SSE(Server-Sent Events)
S->>C: 4. Response(Stream)
Note left of S: NDJSON

 ```


 
