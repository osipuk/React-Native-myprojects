/*
 * EventStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  events: [],
  isLoading: true,
  isEventCreated: false
};

const _setLoading = isLoading => _state.isLoading = isLoading;
const _setEvents = events => _state.events = events.reverse();
const _setEventCreated = isEventCreated =>
  _state.isEventCreated = isEventCreated;

const EventStore = _.assign({}, BaseStore, {

  isLoading() {
    return _state.isLoading;
  },
  
  getEvents() {
    return _state.events;
  },

  isEventCreated() {
    return _state.isEventCreated;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.GET_EVENTS_SUCCESS:
      _setEvents(action.events);
      _setLoading(false);
      EventStore.emitChange();
      break;
    case AppConstants.CREATE_EVENT_SUCCESS:
      _setEventCreated(true);
      EventStore.emitChange();
      break;
  }

});

export default EventStore;
