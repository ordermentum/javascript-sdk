import resource from './resource';

const resources = {
  invoices: resource('/v1/invoices'),
  orders: resource('/v1/orders'),
  purchasers: resource('/v1/purchasers'),
  products: resource('/v1/products'),
  retailers: resource('/v1/retailers'),
  suppliers: resource('/v1/suppliers'),
  webhooks: resource('/v1/webhooks'),
};

export default resources;
