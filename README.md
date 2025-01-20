# ポートフォリオ
Next.js アプリケーションの実装集（自主制作）

## debug-logger.ts
#### デバッグログ出力用ロガー

このライブラリは、`console.debug()` を使用してデバッグログを出力するロガーです。  
サーバーサイドとクライアントサイドの両方で利用可能です。
- サーバーサイドで利用した場合、サーバー側コンソールにログ出力されます。
- クライアントサイドで利用した場合、ブラウザコンソールにログ出力されます。

このライブラリでは、ファクトリを用いてロガーの実装を決定しています。
- importによって最初にロードされた際に環境変数 `process.env.NODE_ENV` を参照し、ログ出力の実装を決定します。
- 開発モード `development` の場合は、 `console.debug()` でログ出力します。
- 本番モード `production` の場合は、ロガーに空実装を適用することでログ出力を無効化します。

これにより、開発中はデバッグログを出力し、本番環境では不要なログ出力を防ぎます。















This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
