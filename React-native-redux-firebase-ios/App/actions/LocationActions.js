/*
 * LocationActions
*/

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GuestarAPI from '../utils/GuestarAPI';

const LocationActions = {

  getLocations(userID) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_LOCATIONS,
      userID: userID
    });
    GuestarAPI.getLocations(userID);
  },

  getLocationsSuccess(locations) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_LOCATIONS_SUCCESS,
      locations: locations
    });
  },

  getLocationsFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_LOCATIONS_FAIL,
      artists: error
    });
  },

  createLocation(locationData) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_LOCATION,
      locationData: locationData
    });
    GuestarAPI.createLocation(locationData);
  },

  createLocationSuccess() {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_LOCATION_SUCCESS
    });
  },

  createLocationFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_LOCATION_FAIL,
      location: error
    });
  }

};

export default LocationActions;
