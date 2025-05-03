# ポートフォリオ
Next.js アプリケーションの実装集

## お問い合わせフォーム

入力されたお問い合わせを、SalesforceのWeb-to-Caseに送信します。  

:open_file_folder: コンポーネント：[app/contact/](app/contact)  
:open_file_folder: モジュール：[modules/contact/](modules/contact)  
:open_file_folder: 画面サンプル：[_docs/contact.md](_docs/contact.md)  

Web-to-Caseのエンドポイントは開発時はモックを提供します。これにより  
モックは `Express` で作成しており、`npm run dev` などの起動コマンドでアプリケーションを起動する際にモックも一緒に起動できるように設計しています。  
アプリケーションとモックを一緒に起動するコマンドは `npm run dev:mock` として、`package.json` にスクリプトを定義しています。  

:open_file_folder: Web-to-Case エンドポイントのモック：[__mocks__/web-to-case.mts](__mocks__/web-to-case.mts)  
:open_file_folder: モック起動スクリプト：[package.json#L12](package.json#L12)  


## validator.ts  
#### バリデーター
バリデーターインターフェースを提供することで、アプリケーションがバリデーションの実装に強く依存しない設計としています。バリデーションの実装にはZodなどのライブラリや、独自の実装を使用できます。

:open_file_folder: コード：[modules/validators/validator.ts](modules/validators/validator.ts)  
:open_file_folder: 使用例：[modules/contact/model.ts#validate](modules/contact/model.ts#L29)


## logger-winston.ts
`winston` を用いたログ出力の例です。ログローテーションも行います。  

:open_file_folder: コード：[modules/loggers/logger-winston.ts](modules/loggers/logger-winston.ts)  
:open_file_folder: 使用例：[logging/page.tsx](app/sample/logging/page.tsx)

## logger.ts  
#### ロギングファサード  

`Java` の `SLF4j` 風のロギングファサードです。統一されたロギングインターフェースを提供することで、アプリケーションがロギングライブラリに直接的に依存しないように設計しています。
`winston` をロギング実装として読み込みしています。

:open_file_folder: コード：[modules/logging-facade/](modules/logging-facade/)  
:open_file_folder: 使用例：[logging/page.tsx](app/sample/logging/page.tsx)

このモジュールが最初にインポートされたタイミングで、アプリケーション内で一意のロガーインスタンスが作成されます。  
以降はキャッシュされたロガーが再利用されます。

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



## server-error-handler.ts
#### サーバーサイドエラーハンドリング

このモジュールは、サーバーサイドエラーハンドリングの実装を統一し、一貫性を持たせます。  
javascriptの関数を引数にとれる性質と、クロージャを活用しています。

エラーハンドリングとして、エラーログを出力しキャッチした例外を再スローします。
Next.jsはこれを未処理の例外としてキャッチし、エラーページ(error.tsx)をレンダリングします。

:open_file_folder: コード：[server-error-handler.ts](modules/error-handlers/server-error-handler.ts)  
:open_file_folder: 使用例：[server-error-handling/page.tsx](app/sample/server-error-handling/page.tsx) , [server-error-handling-async/page.tsx](app/sample/server-error-handling-async/page.tsx)

## search-params.ts
#### クエリパラメーターの型エイリアス

このように型エイリアスを用意しておくことで、アプリケーション内でクエリパラメーターを扱いやすくなります。

Next.js15から、クエリパラメーターは非同期で取得されるようになりました。`Promise` にラップされるため、 `await` を用いてその値を取得する必要があります。

:open_file_folder: コード：[search-params.ts](modules/types/search-params.ts)  
:open_file_folder: 使用例：[search-param/page.tsx](app/sample/search-param/page.tsx)


