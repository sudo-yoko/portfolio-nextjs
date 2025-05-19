 ```mermaid
graph LR  
 クライアントサイド-->サーバーサイドAPIルート-->AIプロバイダー
  サーバーサイドAPIルート--チャンク単位のストリームをレスポンス-->クライアントサイド

  subgraph funcA [Next.js]
    クライアントサイド
    サーバーサイドAPIルート
  end

  subgraph funcB [AIアダプター]
    AIプロバイダー
  end
 ```


 
