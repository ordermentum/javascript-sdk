import axios from 'axios';

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
      responseType: 'json',
      headers: {
        'User-Agent': `Ordermentum Client ${pack.version}`,
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  get(...args) {
    return this.instance.get(...args);
  }

  post(...args) {
    return this.instance.post(...args);
  }

  patch(...args) {
    return this.instance.patch(...args);
  }

  put(...args) {
    return this.instance.put(...args);
  }

  delete(...args) {
    return this.instance.delete(...args);
  }
}
