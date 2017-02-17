import Client from './client';
import NULL_LOGGER from './logger';

import resources from './resources';

function createClient({ apiBase = 'https://app.ordermentum.com', timeout = 3000, token, logger = NULL_LOGGER }) {
  const client = new Client({ token, apiBase, timeout, logger });

  logger.info({ token, apiBase, timeout });

  return {
    client,
    products: resources.products(client),
    retailers: resources.retailers(client),
    purchasers: resources.purchasers(client),
    suppliers: resources.suppliers(client),
    orders: resources.orders(client),
    invoices: resources.invoices(client),
    webhooks: resources.webhooks(client),
  };
}

export default createClient;
