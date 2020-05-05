import Phasetwo from './Phasetwo';

describe('Phasetwo', () => {
  it('getAugment returns supplied augment value', () => {
    const testValue = 'Hello';

    const p2 = new Phasetwo({
      augment: testValue,
    });

    expect(p2.getAugment()).toEqual(testValue);
  });
});
