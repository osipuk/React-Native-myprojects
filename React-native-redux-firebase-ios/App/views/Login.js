import React from 'react-native';
import LoginActions from '../actions/LoginActions';

import FacebookButton from '../components/FacebookButton';

const {
  Component,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} = React;

const {
  width,
  height,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#333',
    alignItems: 'center',
    width,
    height,
  },
  splash: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    width: null,
  },
  image: {
    backgroundColor: 'transparent',
    marginTop: 85,
    width: 200,
    height: 73,
  },
  button: {
    position: 'absolute',
    left: width / 2,
    marginLeft: -85,
    bottom: 60,
    backgroundColor: 'transparent',
  },
});

class Login extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', false);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('default', false);
  }

  _onLogin(data) {
    LoginActions.loginUser(data.credentials.token);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.splash}
          source={{ uri: 'login.jpg', isStatic: true }}
        >
          <Image
            style={styles.image}
            source={{ uri: 'guestar_logo.png', isStatic: true }}
          />
          <FacebookButton
            style={styles.button}
            onLogin={this._onLogin}
          />
        </Image>
      </View>
    );
  }
}

export default Login;
