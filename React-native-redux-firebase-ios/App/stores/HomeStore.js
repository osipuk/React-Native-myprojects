/*
 * HomeStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  isLoading: false,
  user: null
};

const _setLoading = (isLoading) => _state.isLoading = isLoading;
const _setUser = (user) => _state.user = user;

const HomeStore = _.assign({}, BaseStore, {

  isLoading() {
    return _state.isLoading;
  },

  getUser() {
    return _state.user;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.LOGIN_USER:
      _setLoading(true);
      console.log('LOGIN_USER');
      HomeStore.emitChange();
      break;
    case AppConstants.LOGIN_USER_SUCCESS:
      _setLoading(false);
      _setUser(action.user);
      console.log('LOGIN_USER_SUCCESS');
      HomeStore.emitChange();
      break;
    case AppConstants.LOGIN_USER_FAIL:
      _setLoading(false);
      _setUser(null);
      console.log('LOGIN_USER_FAIL');
      HomeStore.emitChange();
      break;
    case AppConstants.LOGOUT_USER_SUCCESS:
      _setLoading(false);
      _setUser(null);
      console.log('LOGOUT_USER_SUCCESS');
      HomeStore.emitChange();
      break;  
    case AppConstants.GET_ARTISTS:
      _setLoading(true);
      HomeStore.emitChange();
      console.log('GET_ARTISTS');
      break;
    case AppConstants.GET_ARTISTS_SUCCESS:
      _setLoading(false);
      console.log('GET_ARTISTS_SUCCESS');
      HomeStore.emitChange();
      break;
    case AppConstants.GET_LOCATIONS:
      _setLoading(true);
      console.log('GET_LOCATIONS');
      HomeStore.emitChange();
      break;
    case AppConstants.GET_LOCATIONS_SUCCESS:
      _setLoading(false);
      console.log('GET_LOCATIONS_SUCCESS');
      HomeStore.emitChange();
      break;    
    case AppConstants.CREATE_LOCATION:
      _setLoading(true);
      console.log('CREATE_LOCATION');
      HomeStore.emitChange();
      break;
    case AppConstants.CREATE_LOCATION_SUCCESS:
      _setLoading(false);
      console.log('CREATE_LOCATION_SUCCESS');
      HomeStore.emitChange();
      break;  
    case AppConstants.GET_EVENTS:
      _setLoading(true);
      console.log('GET_EVENTS');
      HomeStore.emitChange();
      break;
    case AppConstants.GET_EVENTS_SUCCESS:
      _setLoading(false);
      console.log('GET_EVENTS_SUCCESS');
      HomeStore.emitChange();
      break;
    case AppConstants.CREATE_EVENT:
      _setLoading(true);
      console.log('CREATE_EVENT');
      HomeStore.emitChange();
      break;
    case AppConstants.CREATE_EVENT_SUCCESS:
      _setLoading(false);
      console.log('CREATE_EVENT_SUCCESS');
      HomeStore.emitChange();
      break;    
  }
  
});

export default HomeStore;
