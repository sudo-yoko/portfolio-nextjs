# ポートフォリオ
Next.js アプリケーションの実装集

## お問い合わせフォーム

入力されたお問い合わせを、SalesforceのWeb-to-Caseに送信します。  

:open_file_folder: コンポーネント：[app/contact/](app/contact)  
:open_file_folder: モジュール：[modules/contact/](modules/contact)  
:open_file_folder: 画面サンプル：[_docs/contact.md](_docs/contact.md)  

Web-to-Caseのエンドポイントは、開発時はモックを提供します。モックは `Express` で作成しています。  
`npm run dev:mock` のコマンドで、アプリケーションとモックが一緒に起動されるようにしています。 

:open_file_folder: Web-to-Case エンドポイントのモック：[__mocks__/web-to-case.mts](__mocks__/web-to-case.mts)  


## validator.ts  
#### バリデーター
バリデーターインターフェースを提供することで、アプリケーションがバリデーションの実装に強く依存しない設計としています。バリデーションの実装にはZodなどのライブラリや、独自の実装を使用できます。

:open_file_folder: コード：[modules/validators/validator.ts](modules/validators/validator.ts)  
:open_file_folder: 使用例：[modules/contact/model.ts#L33](modules/contact/model.ts#L33)


## logger-winston.ts
`winston` を用いたログ出力の設定例です。ログローテーションも行います。  

:open_file_folder: コード：[modules/loggers/logger-winston.ts](modules/loggers/logger-winston.ts)  

## ロギングファサード

`Java` の `SLF4j` 風のロギングファサードです。統一されたロギングインターフェースを提供し、アプリケーションがロギングライブラリに直接的に依存しないように設計しています。
`winston` をロギング実装として読み込みしています。

:open_file_folder: コード：[modules/logging-facade/](modules/logging-facade/)  
:spiral_notepad: 使用例
```ts
import logger from '@/modules/logging-facade/logger';
...
logger.info('ログメッセージ');
```

## debug-logger.ts
#### デバッグログ出力モジュール

`console.log()` を使用したデバッグログ出力機能を提供します。
- 開発モード `development` の場合に、 `console.log()` でログ出力します。
- 本番モード `production` の場合は、ロガーに空実装を適用することでログ出力を無効化します。

これにより、開発中はデバッグログを出力し、本番環境ではログ出力を防ぎます。

このモジュールが最初にインポートされたタイミングでファクトリ関数が実行され、ロガーの実装が決定します。  
以降はキャッシュされたロガーを再利用するため効率的です。

:open_file_folder: コード：[debug-logger.ts](modules/loggers/debug-logger.ts)  
:spiral_notepad: 使用例
```ts
import debug from '@/modules/loggers/logger-debug';
...
debug('ログメッセージ');
```

## エラーハンドリング
エラーハンドリングの実装を統一し、一貫性を持たせます。  
javascriptの関数を引数にとれる性質と、クロージャを活用した実装となっています。

#### サーバーサイドエラーハンドリング
例外をキャッチして再スローします。Next.jsはこれを未処理の例外として処理し、標準のエラーページ(error.tsx)をレンダリングします。

:open_file_folder: コード：[modules/error-handlers/server-error-handler.ts](modules/error-handlers/server-error-handler.ts)  
:open_file_folder: 使用例：

#### サーバーアクションエラーハンドリング
例外をキャッチして、戻り値にステータスコード500(INTERNAL_SERVER_ERROR)を返します。呼び元は戻り値のステータスコードを確認し、呼び元がエラーハンドリングを行う必要があります。

:open_file_folder: コード：[modules/error-handlers/action-error-handler.ts](modules/error-handlers/action-error-handler.ts)  
:open_file_folder: 使用例：[modules/contact/send-action.ts#L17](modules/contact/send-action.ts#L17)  

#### クライアントサイドエラーハントリング
xxxxxx  

:open_file_folder: コード：[server-error-handler.ts](modules/error-handlers/server-error-handler.ts)  
:open_file_folder: 使用例：[server-error-handling/page.tsx](app/sample/server-error-handling/page.tsx) , [server-error-handling-async/page.tsx](app/sample/server-error-handling-async/page.tsx)

## search-params.ts
#### クエリパラメーターの型エイリアス

このように型エイリアスを用意しておくことで、アプリケーション内でクエリパラメーターを扱いやすくなります。

Next.js15から、クエリパラメーターは非同期で取得されるようになりました。`Promise` にラップされるため、 `await` を用いてその値を取得する必要があります。

:open_file_folder: コード：[search-params.ts](modules/types/search-params.ts)  
:open_file_folder: 使用例：[search-param/page.tsx](app/sample/search-param/page.tsx)


