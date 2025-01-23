import path from 'path';
import fs from 'fs';

// アプリケーション名
const appName = 'portfolio-application';

// ログ出力先フォルダ
const logDir = path.join('log');

// ログファイル名
const logName = 'app-%DATE%.log';

// ログフォルダが存在しない場合は作成する
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// ログフォーマットの指定
