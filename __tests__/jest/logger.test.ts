/**
 * npm install --save-dev jest
 * npm install --save-dev @types/jest
 * 
 * JestはCommonJSで動作する。loggerはトップレベルawaitを使用しているため、JestをESM(ECMAScript Module)で動作させる必要がある。
 * 
 * jest.config.tsを生成
 * npm init jest@latest
 * 以下を追加。.tsをESMとして扱う
 * extensionsToTreatAsEsm: ['.ts', '.tsx'],
 * 
 * JestをESMで実行する。（実行時にnodeにフラフを渡す）
 * npm i -D cross-env
 * "jest": "cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/jest/logger.test.ts",
 * npm run jest
 * 
 * 
 * npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/jest/logger.test.ts
 * 
 */
import logger from "@/modules/(system)/logging-facade/logger";

test('test', () => {
    logger.info('logger test');
})