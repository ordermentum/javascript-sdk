import sinon from 'sinon';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import NULL_LOGGER from 'null-logger';

import resource from '../src/resources/resource';

const FAKE_CLIENT = {
  post() {},
  patch() {},
  put() {},
  get() {},
  logger: NULL_LOGGER,
};

describe('resource', () => {
  const path = '/v1/cats';
  const instance = resource(path);
  const cats = instance(FAKE_CLIENT);

  it('return an instance', () => {
    expect(cats.path).to.equal(path);
    expect(cats.client).to.equal(FAKE_CLIENT);
  });

  it('findAll', async () => {
    const getStub = sinon.stub(FAKE_CLIENT, 'get');
    await cats.findAll({ species: 'tiger' });
    expect(getStub.called).to.be.equal(true);
    getStub.restore();
  });

  describe('findOne', () => {
    it('returns a single item', async () => {
      const cat = { name: 'droppo' };
      const getStub = sinon
        .stub(FAKE_CLIENT, 'get')
        .returns(new Promise(resolve => resolve({ data: [cat] })));
      const response = await cats.findOne({ species: 'tiger' });
      expect(getStub.called).to.be.equal(true);
      expect(response).to.deep.equal(cat);
      getStub.restore();
    });

    it('returns null if no item returned', async () => {
      const getStub = sinon
        .stub(FAKE_CLIENT, 'get')
        .returns(new Promise(resolve => resolve({ data: [] })));
      const response = await cats.findOne({ species: 'tiger' });
      expect(getStub.called).to.be.equal(true);
      expect(response).to.equal(null);
      getStub.restore();
    });
  });

  it('create', async () => {
    const cat = { name: 'droppo' };
    const postStub = sinon
      .stub(FAKE_CLIENT, 'post')
      .returns(new Promise(resolve => resolve(cat)));
    const response = await cats.create<typeof cat>(cat);
    expect(postStub.called).to.be.equal(true);
    expect(response).to.deep.equal(cat);
    postStub.restore();
  });

  it('update', async () => {
    const cat = { name: 'droppo' };
    const putStub = sinon
      .stub(FAKE_CLIENT, 'put')
      .returns(new Promise(resolve => resolve(cat)));
    const response = await cats.update<typeof cat>(cat);
    expect(putStub.called).to.be.equal(true);
    expect(response).to.deep.equal(cat);
    putStub.restore();
  });
});
