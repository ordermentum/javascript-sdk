import url from 'url';

export default function resource(path) {
  const defaultFilter = {
    pageSize: 50,
    pageNo: 1,
  };

  return client => (
    {
      path,
      client,
      defaultFilter,

      findAll(query = {}) {
        const q = Object.assign({}, defaultFilter, query);
        client.logger.trace('findAll', { path: this.path, query: q });
        return client.get(this.path, { params: q });
      },
      findOne(id) {
        client.logger.trace('findOne', { path: this.path, id });
        return client.get(`${this.path}/${id}`);
      },

      get: (...args) => this.findOne(...args),

      create(params = {}) {
        client.logger.trace('create', { path: this.path, params });
        return client.post(this.path, params);
      },
      update(id, params = {}) {
        client.logger.trace('update', { path: this.path, id, params });
        return client.put(`${this.path}/${id}`, params);
      },
    }
  );
}
