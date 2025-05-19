 ```mermaid
graph LR  
 クライアントサイド-->サーバーサイドAPIルート-->AIプロバイダー
  subgraph funcA [Next.js]
    クライアントサイド
    サーバーサイドAPIルート
  end

  subgraph funcB [AIアダプター]
    AIプロバイダー
  end
 ```


 
