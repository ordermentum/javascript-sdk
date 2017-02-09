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
        client.logger.trace('findAll', { path, query: q });
        return client.get(this.path, { query: q });
      },
      findOne(id) {
        client.logger.trace('findOne', { path, id });
        return client.get(url.resolve(path `/${id}`));
      },

      get: (...args) => this.findOne(...args),

      create(params = {}) {
        client.logger.trace('create', { path, params });
        return client.post(this.path, { body: params });
      },
      update(id, params = {}) {
        client.logger.trace('update', { path, id, params });
        return client.put(url.resolve(path `/${id}`), { body: params });
      },
    }
  );
}
