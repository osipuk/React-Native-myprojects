/*
 * ArtistActions
*/

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GuestarAPI from '../utils/GuestarAPI';

const ArtistActions = {

	getArtist() {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTIST
    });
    GuestarAPI.getArtistData();
  },

  getArtistSuccess(artist) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTIST_SUCCESS,
      artist: artist
    });
  },

  getArtistFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTIST_FAIL,
      artist: error
    });
  }

};

export default ArtistActions;
