# ポートフォリオ
Next.js アプリケーションの実装集

## debug-logger.ts
#### デバッグログ出力モジュール

このモジュールは、`console.log()` を使用したデバッグログ出力機能を提供します。  
サーバーサイドとクライアントサイドの両方で利用可能です。
- サーバーサイドで利用した場合、サーバー側コンソールにログ出力されます。
- クライアントサイドで利用した場合、ブラウザコンソールにログ出力されます。

ロガーの実装はファクトリ関数を用いて決定します。  
環境変数 `process.env.NODE_ENV` を基に、
- 開発モード `development` の場合は、 `console.log()` でログ出力します。
- 本番モード `production` の場合は、ロガーに空実装を適用することでログ出力を無効化します。

これにより、開発中はデバッグログを出力し、本番環境では不要なログ出力を防ぎます。

このモジュールが最初にインポートされたタイミングでファクトリ関数が実行され、ロガーの実装が決定します。  
以降はキャッシュされたロガーを再利用するため効率的です。

:open_file_folder: コード：[debug-logger.ts](modules/loggers/debug-logger.ts)  
:open_file_folder: 使用例：[logging-debug/](app/sample/logging-debug)

## logger.ts
#### サーバーログ出力モジュール

`winston` を用いたログ出力の例です。ログローテーションも行います。  
このモジュールが最初にインポートされたタイミングで、アプリケーション内で一意のロガーインスタンスが作成されます。  
以降はキャッシュされたロガーが再利用されます。

:open_file_folder: コード：[logger.ts](modules/loggers/logger.ts)  
:open_file_folder: 使用例：[logging/page.tsx](app/sample/logging/page.tsx)

## server-error-handler.ts
#### サーバーサイドエラーハンドリング

このモジュールは、サーバーサイドエラーハンドリングの実装を統一し、一貫性を持たせます。  
javascriptの関数を引数にとれる性質と、クロージャを活用しています。

:open_file_folder: コード：[server-error-handler.ts](modules/error-handlers/server-error-handler.ts)  
:open_file_folder: 使用例：[server-error-handling/page.tsx](app/sample/server-error-handling/page.tsx) , [server-error-handling-async/page.tsx](app/sample/server-error-handling-async/page.tsx)

## search-params.ts
#### クエリパラメーターの型定義

このように型定義を用意しておくことで、アプリケーション内でクエリパラメーターを扱いやすくなります。

Next.js15から、クエリパラメーターは非同期で取得されるようになりました。`Promise` にラップされるため、 `await` を用いてその値を取得する必要があります。

:open_file_folder: コード：[search-params.ts](modules/types/search-params.ts)  
:open_file_folder: 使用例：[search-param/page.tsx](app/sample/search-param/page.tsx)


