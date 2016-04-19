/**
 * FacebookButton component
 */

'use strict';

import React from 'react-native';
import FBLogin from 'react-native-facebook-login';

const {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  NativeModules: { FBLoginManager }
} = React;

class FacebookButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={() => this._handleLogin()}>
        <View style={styles.FBLoginButton}>
          <Image
            style={styles.FBLogo}
            source={{ uri: 'FB-f-Logo__white_144', isStatic: true }}
          />
          <Text
            style={styles.FBLoginButtonText}
            numberOfLines={1}>
            Entra con Facebook
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _handleLogin() {
    const _this = this;
    FBLoginManager.loginWithPermissions(['email'], function(error, data){
      if (!error) {
        console.log('SONO QUI');
        _this.setState({ user: data });
        _this.props.onLogin && _this.props.onLogin(data);
      } else {
        console.log(error, data);
      }
    });
  }
}

const styles = StyleSheet.create({
  FBLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: 170,
    height: 30,
    paddingLeft: 15,

    backgroundColor: 'rgb(66,93,174)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(66,93,174)',

    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  FBLoginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Helvetica neue',
    fontSize: 14.2,
  },
  FBLoginButtonTextLoggedIn: {
    marginLeft: 5,
  },
  FBLogo: {
    position: 'absolute',
    height: 14,
    width: 14,

    left: 7,
    top: 7,
  }
});

export default FacebookButton;
