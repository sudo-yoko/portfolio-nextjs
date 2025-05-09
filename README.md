# ポートフォリオ
Next.js の実装集

## お問い合わせフォーム

入力されたお問い合わせを、SalesforceのWeb-to-Caseに送信します。  

:open_file_folder: コンポーネント：[app/contact/](app/contact)  
:open_file_folder: モジュール：[modules/contact/](modules/contact)  
:open_file_folder: 画面サンプル：[_docs/contact.md](_docs/contact.md)  

Web-to-Caseのエンドポイントは、開発時はモックを提供します。モックは `Express` で作成しています。  
`npm run dev:mock` のコマンドで、アプリケーションとモックが一緒に起動できるようにしています。  
Salesforce側に依存することなく開発を進めることができます。

:open_file_folder: Web-to-Case エンドポイントのモック：[__mocks__/web-to-case.mts](__mocks__/web-to-case.mts)  


## validator.ts  
#### バリデーター
バリデーターインターフェースを提供することで、アプリケーションがバリデーションの実装に強く依存しない設計にしています。バリデーションの実装にはZodなどのライブラリや、独自の実装を使用できます。

:open_file_folder: コード：[modules/validators/validator.ts](modules/validators/validator.ts)  
:open_file_folder: 使用例：[modules/contact/model.ts#L33](modules/contact/model.ts#L33)


## logger-winston.ts
`winston` を用いたログ出力の設定例です。ログローテーションも行います。  

:open_file_folder: コード：[modules/loggers/logger-winston.ts](modules/loggers/logger-winston.ts)  

## ロギングファサード

`Java` の `SLF4j` 風のロギングファサードです。統一されたロギングインターフェースを提供し、アプリケーションがロギングライブラリに直接的に依存しないように設計しています。
`winston` をロギング実装として読み込みしています。  
後からロギングライブラリを変更したくなった際に、最小限の修正で済みます。

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

開発中はデバッグログを出力し、本番環境ではログ出力を防ぎます。

このモジュールが最初にインポートされたときにファクトリ関数が実行され、ロガーの実装が決定します。  
以降はキャッシュされたロガーを再利用するため効率的です。

:open_file_folder: コード：[logger-debug.ts](modules/loggers/logger-debug.ts)  
:spiral_notepad: 使用例
```ts
import debug from '@/modules/loggers/logger-debug';
...
debug('ログメッセージ');
```

## エラーハンドリング
エラーハンドリングの実装を統一し、一貫性を持たせます。  
javascriptの関数を引数にとれる性質と、クロージャを活用しています。

#### サーバーサイドエラーハンドリング
例外をキャッチして再スローします。Next.jsはこれを未処理の例外として処理し、標準のエラーページ(error.tsx)をレンダリングします。

:open_file_folder: コード：[modules/error-handlers/server-error-handler.ts](modules/error-handlers/server-error-handler.ts)  
:open_file_folder: 使用例：[app/contact/page.tsx#L13](app/contact/page.tsx#L13)  

#### サーバーアクションエラーハンドリング
例外をキャッチして、戻り値にステータスコード500(INTERNAL_SERVER_ERROR)を返します。呼び元は戻り値のステータスコードを確認し、呼び元がエラーハンドリングを行う必要があります。  

サーバーアクションはHTTPエンドポイントとして実行されるため、サーバーアクション内で例外をスローしても、呼び元にそのまま伝播しません。シリアライズ可能なオブジェクトの形式で、戻り値として返却する必要があると考えています。

:open_file_folder: コード：[modules/error-handlers/action-error-handler.ts](modules/error-handlers/action-error-handler.ts)  
:open_file_folder: 使用例：[modules/contact/send-action.ts#L17](modules/contact/send-action.ts#L17)  

#### クライアントサイドエラーハントリング
例外をキャッチしたら、Reactのフックを使ってクライアントサイドでエラーページに遷移させています。

クライアントサイドの例外ハンドリングは、少し工夫が必要でした。
クライアントサイドで例外がスローされても、Next.jsがそれをキャッチして標準のエラーページ(error.tsx)をレンダリングしないケースがあるため、このように自力でエラーページに遷移させる方法を考えました。

:open_file_folder: コード：[modules/error-handlers/client-error-handler.ts](modules/error-handlers/client-error-handler.ts)  
:open_file_folder: 使用例：[app/contact/main.tsx#L28](app/contact/main.tsx#L28)  

## search-params.ts
#### クエリパラメーターの型エイリアス

型エイリアスを用意しておくことで、アプリケーション内でクエリパラメーターを扱いやすくなります。

Next.js15から、クエリパラメーターは非同期で取得されるようになりました。`Promise` にラップされるため、 `await` を用いてその値を取得する必要があります。

:open_file_folder: コード：[search-params.ts](modules/types/search-params.ts)  
:open_file_folder: 使用例：[app/contact/page.tsx#L16](app/contact/page.tsx#L16)


