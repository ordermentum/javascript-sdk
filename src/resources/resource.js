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
        const params = Object.assign({}, defaultFilter, query);
        client.logger.trace('findAll', { path: this.path, params });

        return client.get(this.path, { params });
      },

      findOne(query = {}) {
        const params = Object.assign({}, {
          pageSize: 1,
          pageNo: 1,
        }, query);

        client.logger.trace('findOne', { path: this.path, params });
        return client.get(this.path, { params })
                     .then(response => response.data[0]);
      },

      findById(id) {
        client.logger.trace('findById', { path: this.path, id });
        return client.get(`${this.path}/${id}`);
      },

      get(...args) { return this.findbyId(...args); },

      create(params = {}) {
        client.logger.trace('create', { path: this.path, params });
        return client.post(this.path, params);
      },

      destroy(id) {
        client.logger.trace('destory', { path: this.path, id });
        return client.delete(this.path, id);
      },

      update(id, params = {}) {
        client.logger.trace('update', { path: this.path, id, params });
        return client.put(`${this.path}/${id}`, params);
      },
    }
  );
}
