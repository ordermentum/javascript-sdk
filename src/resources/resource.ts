import Client from '../client';

function singleResource(response) {
  if (Array.isArray(response.data) && response.data.length > 0) {
    return response.data[0];
  }
  return null;
}

type ResourceMethod = { path: string; client: Client };

/**
 * Generic type for responses from Query controllers (i.e. any controller that
 * uses the QueryBuilder to form the response).
 *
 * @argument T type of each element of data being returned in the
 *  data array.
 */
export type QueryResponse<T> = {
  meta: {
    totalResults: number;
    totalPages: number;
    pageSize: number;
    pageNo: number;
  };
  links: {
    self: string;
    first: string;
    prev?: string;
    next?: string;
    last: string;
  };
  data: T[];
};

const findAll = ({ defaultFilter, path, client }) => <T = any>(
  query
): Promise<QueryResponse<T>> => {
  const params = { ...defaultFilter, ...query };
  client.logger.trace('findAll', { path, params });
  return client.get(path, { params });
};

const findOne = ({ path, client }: ResourceMethod) => <T = any>(
  query = {}
): Promise<T> => {
  const params = { pageSize: 1, pageNo: 1, ...query };

  client.logger.trace('findOne', { path, params });
  return client.get(path, { params }).then(singleResource);
};

const findById = ({ path, client }: ResourceMethod) => id => {
  client.logger.trace('findById', { path, id });
  return client.get(`${path}/${id}`);
};

const create = ({ client, path }: ResourceMethod) => (params = {}) => {
  client.logger.trace('create', { path, params });
  return client.post(path, params);
};

const destroy = ({ client, path }: ResourceMethod) => id => {
  client.logger.trace('destroy', { path, id });
  return client.delete(`${path}/${id}`);
};

const update = ({ client, path }: ResourceMethod) => (
  id,
  params = {},
  url = ''
) => {
  client.logger.trace('update', { path, id, params });
  if (url) {
    return client.put(`${path}/${id}/${url}`, params);
  }
  return client.put(`${path}/${id}`, params);
};

const patch = ({ client, path }: ResourceMethod) => (
  id,
  params = {},
  url = ''
) => {
  client.logger.trace('patch', { path, id, params });
  if (url) {
    return client.patch(`${path}/${id}/${url}`, params);
  }
  return client.patch(`${path}/${id}`, params);
};

export type Resource<L = any, C = any, U = any, R = any> = {
  path: string;
  client: Client;
  defaultFilter: { pageSize: number; pageNo: number };
  findAll: (query: any) => Promise<QueryResponse<L>>;
  findOne: (query?: any) => Promise<L>;
  findById: (id: string) => Promise<R>;
  get: (id: string) => Promise<R>;
  create: (params?: C) => Promise<R>;
  destroy: (id: string) => Promise<any>;
  update: (id: string, params?: U, url?: string) => Promise<R>;
  patch: (id: string, params?: U, url?: string) => Promise<R>;
};

export default function resource<L = any, C = any, U = any, R = any>(path) {
  const defaultFilter = {
    pageSize: 50,
    pageNo: 1,
  };

  return (client: Client): Resource<L, C, U, R> => {
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
