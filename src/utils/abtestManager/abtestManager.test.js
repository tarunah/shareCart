import { getAbtest, abtestMap } from './';
import forEach from 'lodash/forEach';

describe('abtestManager', () => {
  it('returns default abtest value', () => {
    forEach(abtestMap, (val, key) => {
      const expectedAb = val.defaultValue;
      const testAb = getAbtest(key);
      expect(testAb).toEqual(expectedAb);
    });
  });
});
