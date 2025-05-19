 ```mermaid
graph LR
  クライアントサイド-->サーバーサイドAPIルート-->AIプロバイダー
  サーバーサイドAPIルート--NDJSON-->クライアントサイド
  AIプロバイダー--SSE(Server-Sent Events)<br>／JSONチャンク、等-->サーバーサイドAPIルート

  subgraph funcA [Next.js]
    クライアントサイド
    サーバーサイドAPIルート
  end

 ```


 
