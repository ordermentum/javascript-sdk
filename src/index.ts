import NULL_LOGGER from 'null-logger';
import resources, { Resources } from './resources/index';

import Client, { IClient } from './client';

function createClient({
  apiBase = 'https://app.ordermentum.com',
  timeout = 3000,
  token,
  logger = NULL_LOGGER,
  adaptor,
}: Pick<IClient, 'token'> &
  Partial<Pick<IClient, 'apiBase' | 'timeout' | 'logger' | 'adaptor'>>) {
  const client = new Client({ token, apiBase, timeout, logger, adaptor });

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
    priceGroups,
    schedules,
  }: Resources = resources(client);

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
    priceGroups,
    schedules,
  };
}

export type OrdermentumClient = Resources & { client: Client };
export default createClient;
