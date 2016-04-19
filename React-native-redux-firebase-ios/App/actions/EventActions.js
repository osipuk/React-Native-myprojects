/*
 * EventActions
*/

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GuestarAPI from '../utils/GuestarAPI';

const EventActions = {

  getEvents(userID) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_EVENTS,
      userID: userID
    });
    GuestarAPI.getEvents(userID);
  },

  getEventsSuccess(events) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_EVENTS_SUCCESS,
      events: events
    });
  },

  getEventsFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_EVENTS_FAIL,
      events: error
    });
  },

  createEvent(eventData) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_EVENT,
      eventData: eventData
    });
    GuestarAPI.createEvent(eventData);
  },

  createEventSuccess() {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_EVENT_SUCCESS
    });
  },

  createEventFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_EVENT_FAIL,
      event: error
    });
  }

};

export default EventActions;
