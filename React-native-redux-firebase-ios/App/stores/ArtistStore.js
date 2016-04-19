/*
 * ArtistStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  artist: React.addons.createFragment({})
};

const _setArtistData = artist => _state.artist = artist;

const ArtistStore = _.assign({}, BaseStore, {

  getArtistData() {
    return _state.artist;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.GET_ARTIST_SUCCESS:
      _setArtistData(action.artist);
      ArtistStore.emitChange();
      break;
  }

});

export default ArtistStore;
