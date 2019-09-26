import { expect } from 'chai';
import ordermentum from '../src';

describe('Client', () => {
  it('return an instance', async () => {
    const apiBase = 'http://api-testing.ordermentum.com';
    const logger = console;
    const token = 'test';
    const client = ordermentum({ apiBase, logger, token });
    expect(client.categories).to.not.equal(null);
    expect(client.products.client).to.deep.equal(client.client);
  });
});
