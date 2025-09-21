// Node.js 組み込みテストランナーによるテスト
//
// node:testはデフォルトではCommonJSで動作する。
// loggerはトップレベルawaitを使用しているため、JestをESM(ECMAScript Module)で動作させる必要がある。
//
// ■ Package.jsonに以下を追加
// "type": "module"
// ※追加することでプロジェクト全体がESMとなる。
// 　　・ただし影響はNodeのみ。Next.config.jsはnodeが起動するので影響あり。.tsもしくは.mjsに変更する必要。
// 　　　他は.jsは.cjsに拡張子を変更する。
// 　　・Next.jsアプリ本体には無影響。
//
// ■ インストール
// npm i -D tsx
//
// ■ node:testをESMで実行する。
// npm exec -- node --test --experimental-test-module-mocks --import tsx __tests__/node-test/logger.test.ts
// 
import test from 'node:test';

test('logger test', async (t) => {
  // server-onlyをモックする
  t.mock.module('server-only', { defaultExport: {}, namedExports: {} });
  // モックしてからloggerを読み込む
  const logger = (await import('@/presentation/(system)/logging-facade/logger')).default;

  logger.info('aaaaaaaaaa');
});
