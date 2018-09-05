import axios from 'axios';
import qs from 'qs';

const pack = require('../package');

export default class Client {
  constructor({ apiBase = 'https://app.ordermentum.com', timeout = 3000, token, logger }) {
    this.apiBase = apiBase;
    this.token = token;
    this.logger = logger;
    this.adapter = axios;
    this.timeout = timeout;
    this.instance = this.getInstance();
  }

  getInstance() {
    return this.adapter.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
      paramsSerializer: params => (
        qs.stringify(params)
      ),
      responseType: 'json',
      headers: {
        'User-Agent': `Ordermentum Client ${pack.version}`,
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  get(...args) {
    return this.instance.get(...args)
    .then(r => r.data);
  }

  post(...args) {
    return this.instance.post(...args)
    .then(r => r.data);
  }

  patch(...args) {
    return this.instance.patch(...args)
    .then(r => r.data);
  }

  put(...args) {
    return this.instance.put(...args)
    .then(r => r.data);
  }

  delete(...args) {
    return this.instance.delete(...args)
    .then(r => r.data);
  }
}
