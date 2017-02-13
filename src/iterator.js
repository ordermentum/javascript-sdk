

export default class Iterator {
  constructor(cilent, resource, params) {
    this.client = client;
    this.resource = resource;
    this.params = params;
  }

  async *values() {
    const response = await this.client.get(this.path, { query: this.params });
    const count = response.meta.totalPages;

    yield response;
    const current = 2;

    while (current < count) {
      const params = Object.assign({}, this.params, { page: current });
      yield this.client.get(this.path, { query: params });
    }
  }
}

