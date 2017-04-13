import resource from './resource';

const resources = client => ({
  invoices: resource('/v1/invoices')(client),
  orders: resource('/v1/orders')(client),
  purchasers: resource('/v1/purchasers')(client),
  products: resource('/v1/products')(client),
  retailers: resource('/v1/retailers')(client),
  suppliers: resource('/v1/suppliers')(client),
  visibilityGroups: resource('/v1/visibility-groups')(client),
  priceGroups: resource('/v1/price-groups')(client),
  schedules: resource('/v1/schedules')(client),
  webhooks: resource('/v1/webhooks')(client),
  categories: resource('/v1/categories')(client),
});

export default resources;
