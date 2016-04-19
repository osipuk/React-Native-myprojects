/**
 * Dashboard Component
 */

'use strict';

import React from 'react-native';
import LoginActions from '../actions/LoginActions';

import Events from './Events';
import Locations from './welcome/Locations';
import NewLocation from './welcome/NewLocation';

import {
  TableView,
  Section,
  Cell,
  CustomCell
} from 'react-native-tableview-simple';

const {
  Component,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  AsyncStorage,
  AlertIOS,
  ActivityIndicatorIOS,
  SwitchIOS,
  NativeModules: { FBLoginManager }
} = React;

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user
    };
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentInset={{ bottom: 112 }}>

        <Image
          source={{ uri: 'guestar_pattern.jpg', isStatic: true }}
          style={styles.account}>
          <Image
            source={{uri: this.props.user.facebook.profileImageURL}}
            style={styles.accountPhoto}>
          </Image>
          <Text style={styles.accountText}>
            {this.props.user.facebook.displayName}
          </Text>
          <Text style={styles.accountEmail}>
            {this.props.user.facebook.email}
          </Text>
        </Image>

        <TableView>
          <Section header='UTENTE'>
            <Cell
              cellstyle='Basic'
              title='Location'
              accessory='DisclosureIndicator'
              onPress={() => this._goToLocations()}
            />
            <Cell
              cellstyle='Basic'
              title='Eventi'
              accessory='DisclosureIndicator'
              onPress={() => this._goToEvents()}
            />
            <Cell
              cellstyle='Basic'
              title='Logout'
              accessory='DisclosureIndicator'
              onPress={() => this._logoutUser()}
            />
          </Section>
          <Section header='GUESTAR'>
            <Cell
              cellstyle='Basic'
              title='Credits'
              accessory='DisclosureIndicator'
              onPress={() => console.log('Credits')}
            />
            <Cell
              cellstyle='Basic'
              title='Terms'
              accessory='DisclosureIndicator'
              onPress={() => console.log('Terms')}
            />
          </Section>
        </TableView>
      </ScrollView>
    );
  }

  _goToLocations() {
    this.props.navigator.push({
      title: 'Location',
      component: Locations,
      backButtonTitle: 'Indietro',
      rightButtonTitle: 'Nuova',
      onRightButtonPress: () => this._goToNewLocation(),
      passProps: {
        user: this.state.user,
        from: 'dashboard'
      }
    });
  }

  _goToNewLocation() {
    const user = this.state.user.facebook.displayName;
    const name = user.substr(0, user.indexOf(' '));

    this.props.navigator.push({
      title: 'Nuova location',
      component: NewLocation,
      passProps: {
        user: this.state.user
      }
    });
  }

  _goToEvents() {
    this.props.navigator.push({
      title: 'Eventi',
      component: Events,
      backButtonTitle: 'Indietro',
      passProps: {
        user: this.state.user,
        from: 'dashboard'
      }
    });
  }

  _logoutUser() {

    const user = this.state.user.facebook.displayName;
    const name = user.substr(0, user.indexOf(' '));

    AlertIOS.prompt(
      'Guestar',
      'Hey ' + name + '! 😊\nVuoi davvero effettuare il logout?',
      [{text: 'Logout', onPress: (text) => {

          FBLoginManager.logout(function(error, data){
            if (!error) {
              AsyncStorage.removeItem('accessToken');
              LoginActions.logoutUser();
            } else {
              console.log(error, data);
            }
          });

        }, type: 'plain-text'},
      {text: 'Annulla', style: 'cancel'}],
      'default'
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  },
  account: {
    flex: 1,
    width: null,
    height: null,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  accountText: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 22,
    backgroundColor: 'transparent'
  },
  accountEmail: {
    color: '#FFF',
    fontSize: 13,
    backgroundColor: 'transparent'
  }
});

export default Dashboard;
