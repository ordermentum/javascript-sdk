import axios, { AxiosStatic, AxiosRequestConfig } from 'axios';
import qs from 'qs';
// eslint-disable-next-line import/no-unresolved
import * as Logger from 'bunyan';
import pack from '../package.json';

export interface IClient {
  logger: Logger;
  username?: string;
  token: string;
  timeout: number;
  callback?: () => void;
  apiBase: string;
}

abstract class Client {
  constructor({
    callback = () => {},
    logger,
    timeout = 5000,
    apiBase,
    token,
  }: IClient) {
    this.apiBase = apiBase;
    this.logger = logger;
    this.callback = callback;
    this.adaptor = axios;
    this.token = token;
    this.timeout = timeout;
  }

  apiBase: string;

  logger: Logger;

  timeout: number;

  callback: () => void;

  adaptor: AxiosStatic;

  token: string;
}

export default class OrdermentumClient extends Client {
  super({
    apiBase = 'https://app.ordermentum.com',
    timeout = 3000,
    token,
    logger,
  }: IClient) {
    this.apiBase = apiBase;
    this.token = token;
    this.logger = logger;
    this.adaptor = axios;
    this.timeout = timeout;
  }

  get instance() {
    return this.adaptor.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
      paramsSerializer: params => qs.stringify(params),
      responseType: 'json',
      headers: {
        'User-Agent': `Ordermentum Client ${pack.version}`,
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  get(url: string, params: AxiosRequestConfig) {
    return this.instance.get(url, params).then(r => r.data);
  }

  post(url: string, body: object) {
    return this.instance.post(url, body).then(r => r.data);
  }

  patch(url: string, body: object) {
    return this.instance.patch(url, body).then(r => r.data);
  }

  put(url: string, body: object) {
    return this.instance.put(url, body).then(r => r.data);
  }

  delete(url: string) {
    return this.instance.delete(url).then(r => r.data);
  }
}
