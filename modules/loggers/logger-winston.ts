import fs from 'fs';
import path from 'path';
import 'server-only';
import winston, { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';

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
const myFormat = format.printf(({ level, message, timestamp, ...meta }) => {
  return `[${timestamp}] [${level}] [${appName}] [${meta['requestId']}] [] [] [] [${meta['traceId']}] [[${message}]]`;
});

// ロガーの作成
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    myFormat,
  ),
});

// ログローテーションの設定
const options: DailyRotateFile.DailyRotateFileTransportOptions = {
  filename: logName,
  dirname: logDir,
  datePattern: 'YYYY-MM-DD',
};
options.maxSize = '10k'; // ローテーションの最大ファイルサイズ：10KB
options.maxFiles = '1d'; // ログの保管期間：1日
const transport = new winston.transports.DailyRotateFile(options);

// ログをファイルに出力
logger.add(transport);
// 開発時はコンソールにも出力
if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.Console());
}

// ロガーの設定完了メッセージ
console.log(
  `Logger setup complete. Log directory=${logDir}, Rotation max size=${options.maxSize}, Rotation max files=${options.maxFiles}`,
);

export default logger;
