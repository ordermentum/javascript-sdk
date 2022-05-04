import axios, { AxiosStatic, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import Logger from './definitions/logger';

let isNode = true;
if (globalThis && 'window' in globalThis) isNode = false;

export interface IClient {
  logger: Logger;
  username?: string;
  token: string;
  timeout: number;
  callback?: () => void;
  apiBase: string;
  adaptor?: AxiosStatic;
}

abstract class Client {
  constructor({
    callback = () => {},
    logger,
    timeout = 5000,
    apiBase,
    adaptor,
    token,
  }: IClient) {
    this.apiBase = apiBase;
    this.logger = logger;
    this.callback = callback;
    this.adaptor = adaptor || axios;
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
    adaptor,
  }: IClient) {
    this.apiBase = apiBase;
    this.token = token;
    this.logger = logger;
    this.adaptor = adaptor || axios;
    this.timeout = timeout;
  }

  get instance() {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };

    if (this.userAgent) {
      headers['User-Agent'] = this.userAgent;
    }

    return this.adaptor.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
      paramsSerializer: params => qs.stringify(params),
      responseType: 'json',
      headers,
    });
  }

  get userAgent() {
    return isNode ? `Ordermentum Client 1.1.0` : undefined;
  }

  async get<T = any>(url: string, params?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, params).then(r => r.data);
  }

  async post<T = any>(url: string, body: object): Promise<T> {
    return this.instance.post<T>(url, body).then(r => r.data);
  }

  async patch<T = any>(url: string, body: object): Promise<T> {
    return this.instance.patch<T>(url, body).then(r => r.data);
  }

  async put<T = any>(url: string, body: object): Promise<T> {
    return this.instance.put<T>(url, body).then(r => r.data);
  }

  async delete<T = any>(url: string): Promise<T> {
    return this.instance.delete(url).then(r => r.data);
  }
}
