// Next:Jestによるテスト
//
// ■ インストール
// npm install --save-dev jest @types/jest
//
// ■ jest.config.tsを生成
// npm init jest@latest
// next:jestを使用する設定に更新する。（https://nextjs.org/docs/app/guides/testing/jest）
//
// JestはデフォルトではCommonJSで動作する。
// loggerはトップレベルawaitを使用しているため、JestをESM(ECMAScript Module)で動作させる必要がある。
// 以下を追加。.tsをESMとして扱う
// extensionsToTreatAsEsm: ['.ts', '.tsx'],
//
// ■ JestをESMで実行する。（実行時にnodeにフラグを渡す）
// npm i -D cross-env
//
// package.jsonに以下のscriptを追加して実行する
// "next:jest": "cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/logger.test.ts",
//　npm run next:jest
// もしくは以下のコマンドで直接実行
//　npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/logger.test.ts
//
import logger from '@/presentation/(system)/logging/logger.s';

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/logging/logger.s.test.ts -t 'test1-1'
test('test1-1', () => {
  logger.info('logger test', { opt1: '1', opt2: '2', opt3: '3', opt4: '4', opt5: '5' });
  logger.info('logger test');
});
