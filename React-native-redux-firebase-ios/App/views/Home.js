/**
 * Home Component
 */

'use strict';

import React from 'react-native';

import HomeStore from '../stores/HomeStore';
import LoginActions from '../actions/LoginActions';

import Menu from '../components/Menu';
import Login from './Login';
import Welcome from './Welcome';
import Events from './Events';
import Dashboard from './Dashboard';
import About from './About';

const {
  AsyncStorage,
  ActivityIndicatorIOS,
  Component,
  Image,
  Dimensions,
  StyleSheet,
  View
} = React;

const {
  width,
  height
} = Dimensions.get('window');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLogged: false,
      user: HomeStore.getUser(),
      isLoading: HomeStore.isLoading()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onChange);

    AsyncStorage.getItem('accessToken').then((accessToken) => {
      this.setState({ isReady: true });
      if(accessToken && accessToken !== '') {
        LoginActions.loginUser(accessToken);
      }
    }).done();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isReady ?
          (this.state.user) ?
            <Menu
              firstRoute={{
                title: 'Home',
                component: Welcome,
                iconName: 'ios-home-outline',
                selectedIconName: 'ios-home',
                passProps: {
                  user: this.state.user
                }
              }}
              secondRoute={{
                title: 'Eventi',
                component: Events,
                iconName: 'ios-list-outline',
                selectedIconName: 'ios-list',
                passProps: {
                  user: this.state.user,
                  from: 'home'
                }
              }}
              thirdRoute={{
                title: 'About',
                component: About,
                iconName: 'ios-star-outline',
                selectedIconName: 'ios-star'
              }}
              fourthRoute={{
                title: 'Dashboard',
                component: Dashboard,
                iconName: 'ios-person-outline',
                selectedIconName: 'ios-person',
                passProps: {
                  user: this.state.user
                }
              }}
            />
          :
            <Login />
        :
          <Image
            style={styles.splash}
            source={{ uri: 'splashscreen.png', isStatic: true }}
          />
        }
        {this.state.isLoading ? this._renderLoading() : <View />}
      </View>
    );
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
          <View style={styles.loadingSpinner}>
            <ActivityIndicatorIOS size='large' />
          </View>
      </View>
    );
  }

  _onChange() {

    this.setState({
      isLoading: HomeStore.isLoading(),
      user: HomeStore.getUser()
    });

    if(this.state.user) {
      AsyncStorage.setItem(
        'accessToken',
        this.state.user.facebook.accessToken
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: width,
    height: height,
    opacity: 0.5,
    backgroundColor: '#222'
  },
  loadingSpinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  loadingBanner: {
    position: 'absolute',
    backgroundColor: '#BF1C2C',
    top: 64,
    width: width,
    height: 24
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 4,
    color: '#FFFFFF'
  }
});

export default Home;
