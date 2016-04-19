/*
 * GuestarAPI
 */

'use strict';

import Rebase from 're-base';
import WelcomeActions from '../actions/WelcomeActions';
import LoginActions from '../actions/LoginActions';
import ArtistActions from '../actions/ArtistActions';
import LocationActions from '../actions/LocationActions';
import EventActions from '../actions/EventActions';

const base = Rebase.createClass('https://guestar.firebaseio.com');
let artists, locations, events;

const GuestarAPI = {

  loginUser(token) {
    base.authWithOAuthToken('facebook', token, function(error, authData) {
      if (error) {
        LoginActions.loginUserFail(error);
      } else {
        console.log(authData);
        LoginActions.loginUserSuccess(authData);
      }
    });
  },

  logoutUser() {
    new Promise((resolve, reject) => {
      base.unauth();
      const loginState = base.getAuth();
      if(!loginState) {
        resolve('Utente sloggato.');
      }
      else {
        reject('Errore nel logout!');
      }
    }).then((result) => {
      console.log(result);
      LoginActions.logoutUserSuccess();
    }, (err) => {
      console.log(err);
      LoginActions.logoutUserFail();
    });
  },

  getArtists() {

    if(artists) base.removeBinding(artists);

  	artists = base.listenTo('artists', {
	    context: this,
	    asArray: true,
	    then(artists) {
	      WelcomeActions.getArtistsSuccess(artists);
	    },
	    error(error) {
	    	WelcomeActions.getArtistsError(error);
	    }
	  });
  },

  getArtist(id) {
  	base.fetch('artists/' + id, {
	    context: this,
	    asArray: false,
	    then(artist){
	      ArtistActions.getArtistSuccess(artist);
	    },
	    error(error) {
	    	ArtistActions.getArtistError(error);
	    }
	  });
  },

  getLocations(uid) {

    if(locations) base.removeBinding(locations);

    locations = base.listenTo('locations/' + uid, {
      context: this,
      asArray: true,
      then(locations) {
        LocationActions.getLocationsSuccess(locations);
      },
      error(error) {
        LocationActions.getLocationsError(error);
      }
    });
  },

  createLocation(locationData) {
    base.push('locations/' + locationData.uid, {
      data: locationData,
      then(){
        LocationActions.createLocationSuccess();
      }
    });
  },

  getEvents(uid = null) {
    
    if(events) base.removeBinding(events);
    const queries = (uid) ? { orderByChild: 'uid', equalTo: uid } : {};

    events = base.listenTo('events', {
      context: this,
      asArray: true,
      queries: queries,
      then(events) {
        EventActions.getEventsSuccess(events);
      },
      error(error) {
        EventActions.getEventsError(error);
      }
    }); 

  },

  createEvent(eventData) {
    base.push('events', {
      data: eventData,
      then(){
        EventActions.createEventSuccess();
      }
    });
  }
	
};

export default GuestarAPI;
