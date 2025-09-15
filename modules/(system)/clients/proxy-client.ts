//
// プロキシ設定付きRESTクライアント（Axiosインスタンス）
//
import { env, envNumber, envProtocol } from '@/modules/(system)/env/env-helper';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import 'server-only';

function create(): AxiosInstance {
  const protocol = envProtocol('PROXY_PROTOCOL');
  const host = env('PROXY_HOST');
  const port = envNumber('PROXY_PORT');

  return axios.create({
    proxy: { protocol, host, port },
  });
}
const client: AxiosInstance = create();

export default client;
