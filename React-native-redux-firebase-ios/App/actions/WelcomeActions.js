/*
 * WelcomeActions
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GuestarAPI from '../utils/GuestarAPI';

const WelcomeActions = {

	getArtists() {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTISTS
    });
    GuestarAPI.getArtists();
  },

  getArtistsSuccess(artists) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTISTS_SUCCESS,
      artists: artists
    });
  },

  getArtistsFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTISTS_FAIL,
      artists: error
    });
  }

};

export default WelcomeActions;
