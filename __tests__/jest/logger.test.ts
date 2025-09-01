// Jestによるテスト
//
// ■ インストール
// npm install --save-dev jest @types/jest
//
// JestはデフォルトではCommonJSで動作する。
// loggerはトップレベルawaitを使用しているため、JestをESM(ECMAScript Module)で動作させる必要がある。
//
// ■ jest.config.tsを生成
// npm init jest@latest
// 以下を追加。.tsをESMとして扱う
// extensionsToTreatAsEsm: ['.ts', '.tsx'],
//
// ■ JestをESMで実行する。（実行時にnodeにフラグを渡す）
// npm i -D cross-env
// 
// package.jsonに以下のscriptを追加して実行する
// "jest": "cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/jest/logger.test.ts",
//　npm run jest
// もしくは以下のコマンドで直接実行
//　npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/jest/logger.test.ts
// 
import logger from "@/modules/(system)/logging-facade/logger";

test('test', () => {
    logger.info('logger test');
})