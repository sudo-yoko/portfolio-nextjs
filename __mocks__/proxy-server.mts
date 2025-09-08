//
// プロキシサーバーのモック。プロキシ転送を模倣する。（フォワードプロキシ）
//
// curl -x http://localhost:9999 -X POST http://localhost:3001/servlet/servlet.WebToCase?encoding=UTF-8 -H "Content-Type: application/x-www-form-urlencoded" -d "name=111&email=eeee"
//
import http, { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';

const logPrefix = '>>> ';

const PORT = 9999;

const proxy = httpProxy.createProxyServer({});

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(logPrefix + `Proxying -> method=${req.method}, url=${req.url}`);
    // リクエストをプロキシ転送する
    proxy.web(req, res, { target: req.url });
  },
);

server.listen(PORT, () => {
  console.log(
    logPrefix +
      `Mock service running on http://localhost:${PORT} (proxy-service-mock)`,
  );
});
