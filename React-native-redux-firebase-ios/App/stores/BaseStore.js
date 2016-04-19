import _ from 'lodash';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

const BaseStore = _.assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

export default BaseStore;
