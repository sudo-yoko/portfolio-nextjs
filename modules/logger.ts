import path from 'path';
import fs from 'fs';
import { format, createLogger } from 'winston';
import dailyRotateFile from 'winston-daily-rotate-file';

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
const myFormat = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}] [${appName}] [[${message}]]`;
});

// ロガーの作成
export const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    myFormat,
  ),
});

// ログローテーションの設定
const oprions: