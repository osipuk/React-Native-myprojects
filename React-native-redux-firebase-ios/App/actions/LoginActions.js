/*
 * LoginActions
*/

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GuestarAPI from '../utils/GuestarAPI';

const LoginActions = {

  loginUser(token) {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOGIN_USER,
      token: token
    });
    GuestarAPI.loginUser(token);
  },

  loginUserSuccess(user) {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOGIN_USER_SUCCESS,
      user: user
    });
  },

  loginUserFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOGIN_USER_FAIL,
      user: error
    });
  },

  logoutUser() {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOGOUT_USER
    });
    GuestarAPI.logoutUser();
  },

  logoutUserSuccess() {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOGOUT_USER_SUCCESS
    });
  },

  logoutUserFail() {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOGOUT_USER_FAIL
    });
  }

};

export default LoginActions;
