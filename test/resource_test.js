import { expect } from 'chai';
import resource from '../src/resources/resource';

describe('resource', () => {
  it('return an instance', async () => {
    const path = 'v1/cats';
    const fakeClient = {};
    const catResource = resource(path);
    const cat = catResource(fakeClient);
    expect(cat.path).to.equal(path);
    expect(cat.client).to.equal(fakeClient);
  });
});
