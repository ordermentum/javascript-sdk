import { expect } from 'chai';
import Client from '../src/client';

describe('Client', () => {
  it('return an instance', async () => {
    const apiBase = 'http://api-testing.ordermentum.com';
    const logger = console;
    const token = 'test';
    const client = new Client({ apiBase, logger, token });
    expect(client.token).to.equal(token);
    expect(client.logger).to.equal(logger);
    expect(client.apiBase).to.equal(apiBase);
  });

  describe('post', async () => {

  });
});
