import Client from '../client';
import resource, { Resource } from './resource';

export type Resources = {
  invoices: Resource;
  orders: Resource;
  purchasers: Resource;
  products: Resource;
  retailers: Resource;
  suppliers: Resource;
  visibilityGroups: Resource;
  priceGroups: Resource;
  schedules: Resource;
  webhooks: Resource;
  integrations: Resource;
  categories: Resource;
  properties: Resource;
  creditNotes: Resource;
  events: Resource;
};

const resources = (client: Client) => ({
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
  integrations: resource('/v1/integrations')(client),
  categories: resource('/v1/categories')(client),
  properties: resource('/v1/properties')(client),
  creditNotes: resource('/v1/credit-notes')(client),
  events: resource('/v1/events')(client),
});

export default resources;
