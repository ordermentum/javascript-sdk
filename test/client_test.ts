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

  it('unwraps data', async function () {
    this.timeout(10000);
    const apiBase = 'http://jsonip.com';
    const logger = console;
    const token = 'test';
    const client = new Client({ apiBase, logger, token });
    const data = await client.get('');
    expect(data.ip).to.exist;
    expect(data.status).to.not.exist;
  });

  it('throws on errors', async function () {
    this.timeout(10000);
    const apiBase = 'http://httpstat.us';
    const logger = console;
    const token = 'test';
    const client = new Client({ apiBase, logger, token });

    let thrown = false;

    try {
      await client.get('500');
    } catch (e) {
      thrown = true;
      expect(e.response.status).to.equal(500);
      expect(e.response.statusText).to.equal('Internal Server Error');
    }

    expect(thrown).to.equal(true);
  });
});
