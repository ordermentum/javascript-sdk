import axios, { AxiosStatic, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import Logger from './definitions/logger';

export interface IClient {
  logger: Logger;
  username?: string;
  token: string;
  timeout: number;
  callback?: () => void;
  apiBase: string;
  errorInterceptor?: ((error: any) => any) | undefined
}

abstract class Client {
  constructor({
    callback = () => {},
    logger,
    timeout = 5000,
    apiBase,
    token,
    errorInterceptor = undefined
  }: IClient) {
    this.apiBase = apiBase;
    this.logger = logger;
    this.callback = callback;
    this.adaptor = axios;
    this.token = token;
    this.timeout = timeout;
    this.errorInterceptor = errorInterceptor;
  }

  apiBase: string;

  logger: Logger;

  timeout: number;

  callback: () => void;

  adaptor: AxiosStatic;

  token: string;

  errorInterceptor: ((error: any) => any) | undefined
}

export default class OrdermentumClient extends Client {
  super({
    apiBase = 'https://app.ordermentum.com',
    timeout = 3000,
    token,
    logger,
    errorInterceptor
  }: IClient) {
    this.apiBase = apiBase;
    this.token = token;
    this.logger = logger;
    this.adaptor = axios;
    this.timeout = timeout;
    this.errorInterceptor = errorInterceptor;
  }

  get instance() {
    const instance =  this.adaptor.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
      paramsSerializer: params => qs.stringify(params),
      responseType: 'json',
      headers: {
        'User-Agent': `Ordermentum Client 1.0.0`
        // Authorization: `Bearer ${this.token}`, 
      },
    });

    if(this.errorInterceptor) {
      instance.interceptors.response.use(undefined, this.errorInterceptor);
    }
    return instance;
  }

  async get(url: string, params: AxiosRequestConfig) {
    return this.instance.get(url, params).then(r => r.data);
  }

  async post(url: string, body: object) {
    return this.instance.post(url, body).then(r => r.data);
  }

  async patch(url: string, body: object) {
    return this.instance.patch(url, body).then(r => r.data);
  }

  async put(url: string, body: object) {
    return this.instance.put(url, body).then(r => r.data);
  }

  async delete(url: string) {
    return this.instance.delete(url).then(r => r.data);
  }
}
