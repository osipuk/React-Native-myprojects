/*
 * WelcomeStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  isLoading: true,
  artists: []
};

const _setLoading = isLoading => _state.isLoading = isLoading;
const _setArtists = artists => _state.artists = artists.reverse();

const WelcomeStore = _.assign({}, BaseStore, {

  isLoading() {
    return _state.isLoading;
  },

  getArtists() {
    return _state.artists;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.GET_ARTISTS_SUCCESS:
      _setArtists(action.artists);
      _setLoading(false);
      WelcomeStore.emitChange();
      break;
  }

});

export default WelcomeStore;
