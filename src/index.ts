import NULL_LOGGER from 'null-logger';

import Client from './client';
import resources from './resources';

function createClient({
  apiBase = 'https://app.ordermentum.com',
  timeout = 3000,
  token,
  logger = NULL_LOGGER,
}) {
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
    visibilityGroups,
    retailers,
    integrations,
    properties,
    creditNotes,
    events,
  } = resources(client);

  return {
    client,
    invoices,
    orders,
    purchasers,
    products,
    retailers,
    visibilityGroups,
    suppliers,
    webhooks,
    categories,
    integrations,
    properties,
    creditNotes,
    events,
  };
}

export default createClient;
