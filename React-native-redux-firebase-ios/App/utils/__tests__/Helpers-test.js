jest.dontMock('../Helpers');

const Helpers = require('../Helpers');

const dummy = {
  foo: 'bar',
};

describe('Helpers', () => {

  describe('getKeyByValue', () => {

    it('returns the key if the value exists', () => {
      const value = Helpers.getKeyByValue(dummy, 'bar');
      expect(value).toBe('foo');
    });

    it('returns undefined if the value does not exist', () => {
      const value = Helpers.getKeyByValue(dummy, 'yo');
      expect(value).toBeUndefined();
    });

  });

});
