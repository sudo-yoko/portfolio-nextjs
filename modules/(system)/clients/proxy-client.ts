//
// プロキシ設定付きRESTクライアント（Axiosインスタンス）
//
import { env, envNumber, envProtocol } from '@/modules/(system)/env/env-helper';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { Agent } from 'http';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import 'server-only';

function create(): AxiosInstance {
  const protocol = envProtocol('PROXY_PROTOCOL');
  const host = env('PROXY_HOST');
  const port = envNumber('PROXY_PORT');
  const proxyUrl = `${protocol}://${host}:${port}`;

  const agent: Agent =
    protocol === 'http'
      ? new HttpProxyAgent(proxyUrl)
      : new HttpsProxyAgent(proxyUrl);

  return axios.create({
    proxy: false,
    httpAgent: agent,
    httpsAgent: agent,
  });
}

const client: AxiosInstance = create();

export default client;
