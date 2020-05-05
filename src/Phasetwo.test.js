import Keycloak from 'keycloak-js';
import Phasetwo from './Phasetwo';

jest.mock('keycloak-js');

beforeEach(() => {
  Keycloak.mockClear();
});

describe('Phasetwo', () => {
  it('getAugment returns supplied augment value', () => {
    const testValue = 'Hello';

    const p2 = new Phasetwo({
      augment: testValue,
    });

    expect(p2.getAugment()).toEqual(testValue);
  });

  describe('Keycloak interactions', () => {
    it('Keycloak gets created', () => {
      const p2 = new Phasetwo();
      expect(Keycloak).toHaveBeenCalled();
    });
  });
});
