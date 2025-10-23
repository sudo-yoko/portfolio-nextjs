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
import { Level } from '@/presentation/(system)/logging/logging.types';

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/logging/logger.s.test.ts -t 'test1-1'
test('test1-1', () => {
  logger.log(Level.Info, 'logger test', {
    extra1: '10',
    extra2: '20',
    extra3: '30',
    extra4: '40',
    extra5: '50',
  });
  logger.log(Level.Info, 'logger test');

  logger.info('logger test', { extra1: '10', extra2: '20', extra3: '30', extra4: '40', extra5: '50' });
  logger.info('logger test');

  logger.warn('logger test', { extra1: '10', extra2: '20', extra3: '30', extra4: '40', extra5: '50' });
  logger.warn('logger test');

  logger.error('logger test', { extra1: '10', extra2: '20', extra3: '30', extra4: '40', extra5: '50' });
  logger.error('logger test');

  logger.debug('logger test', { extra1: '10', extra2: '20', extra3: '30', extra4: '40', extra5: '50' });
  logger.debug('logger test');
});
