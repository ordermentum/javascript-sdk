import Client from './client';
import NULL_LOGGER from './logger';

import resources from './resources';

function createClient({ apiBase = 'https://app.ordermentum.com', timeout = 3000, token, logger = NULL_LOGGER }) {
  const client = new Client({ token, apiBase, timeout, logger });

  logger.info({ token, apiBase, timeout });

  const {
    orders,
    purchasers,
    products,
    categories,
    webhooks,
    invoices,
    suppliers,
    retailers,
  } = resources(client);

  return {
    client,
    invoices,
    orders,
    purchasers,
    products,
    retailers,
    suppliers,
    webhooks,
    categories,
  };
}

export default createClient;
