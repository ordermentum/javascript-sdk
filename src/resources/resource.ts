function singleResource(response) {
  if (Array.isArray(response.data) && response.data.length > 0) {
    return response.data[0];
  }

  return null;
}

const findAll = ({ defaultFilter, path, client }) => query => {
  const params = { ...defaultFilter, ...query };
  client.logger.trace('findAll', { path, params });
  return client.get(path, { params });
};

const findOne = ({ path, client }) => (query = {}) => {
  const params = { pageSize: 1, pageNo: 1, ...query };

  client.logger.trace('findOne', { path, params });
  return client.get(path, { params }).then(singleResource);
};

const findById = ({ path, client }) => id => {
  client.logger.trace('findById', { path, id });
  return client.get(`${path}/${id}`);
};

const create = ({ client, path }) => (params = {}) => {
  client.logger.trace('create', { path, params });
  return client.post(path, params);
};

const destroy = ({ client, path }) => id => {
  client.logger.trace('destroy', { path, id });
  return client.delete(`${path}/${id}`);
};

const update = ({ client, path }) => (id, params = {}, url = '') => {
  client.logger.trace('update', { path, id, params });
  if (url) {
    return client.put(`${path}/${id}/${url}`, params);
  }
  return client.put(`${path}/${id}`, params);
};

const patch = ({ client, path }) => (id, params = {}, url = '') => {
  client.logger.trace('patch', { path, id, params });
  if (url) {
    return client.patch(`${path}/${id}/${url}`, params);
  }
  return client.patch(`${path}/${id}`, params);
};

export default function resource(path) {
  const defaultFilter = {
    pageSize: 50,
    pageNo: 1,
  };

  return client => {
    return {
      path,
      client,
      defaultFilter,
      findAll: findAll({ client, defaultFilter, path }),
      findOne: findOne({ client, path }),
      findById: findById({ client, path }),
      get: findById({ client, path }),
      create: create({ client, path }),
      destroy: destroy({ client, path }),
      update: update({ client, path }),
      patch: patch({ client, path }),
    };
  };
}
