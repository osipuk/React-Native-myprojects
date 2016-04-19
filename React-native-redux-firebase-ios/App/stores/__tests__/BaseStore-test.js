jest.dontMock('lodash');
jest.dontMock('../BaseStore');

const BaseStore = require('../BaseStore');

const callback = () => {};

describe('BaseStore', () => {

  describe('emitChange', () => {

    it('emits the change event', () => {
      BaseStore.emit = jest.genMockFunction();
      BaseStore.emitChange();
      expect(BaseStore.emit).toBeCalledWith('change');
    });

  });

  describe('addChangeListener', () => {

    it('adds a change listener', () => {
      BaseStore.on = jest.genMockFunction();
      BaseStore.addChangeListener(callback);
      expect(BaseStore.on).toBeCalledWith('change', callback);
    });

  });

  describe('removeChangeListener', () => {

    it('removes a change listener', () => {
      BaseStore.removeListener = jest.genMockFunction();
      BaseStore.removeChangeListener(callback);
      expect(BaseStore.removeListener).toBeCalledWith('change', callback);
    });

  });

});
