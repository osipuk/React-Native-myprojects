/**
 * Artist Component
 */

'use strict';

import React from 'react-native';
import Locations from './Locations';
import NewLocation from './NewLocation';

import Icon from 'react-native-vector-icons/FontAwesome';
const baseURL = 'https://guestar.firebaseapp.com/images/';

const {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  AlertIOS,
  ScrollView
} = React;

class Artist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artist: this.props.artist,
      user: this.props.user
    };
  }

  render() {
    return (
      <ScrollView
        contentInset={{ bottom: 112 }}>
        <Image
          style={styles.image}
          source={{ uri: baseURL + this.state.artist.imageHorizontal }}
          resizeMode={'cover'}
        />

        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this._goToLocations()}
            style={styles.button}>
            <Text
              style={styles.buttonText}>
              Invita al tuo evento
            </Text>
          </TouchableOpacity>

          <View style={[styles.boxContainer, styles.boxContainerTop]}>
            <View style={[styles.box, styles.boxTopLeft]}>
              <Text style={styles.boxText}>Componenti</Text>
              {this._renderIcon('star')}
              <Text style={styles.boxText}>{this.state.artist.members}</Text>
            </View>
            <View style={[styles.box, styles.boxTopCenter]}>
              <Text style={styles.boxText}>Crew</Text>
              {this._renderIcon('users')}
              <Text style={styles.boxText}>{this.state.artist.crew}</Text>
            </View>
            <View style={[styles.box, styles.boxTopRight]}>
              <Text style={styles.boxText}>Strumenti</Text>
              {this._renderIcon('music')}
              <Text style={styles.boxText}>
                {this.state.artist.instruments ? 'si' : 'no'}
              </Text>
            </View>
          </View>
          <View style={[styles.boxContainer, styles.boxContainerBottom]}>
            <View style={[styles.box, styles.boxBottomLeft]}>
              <Text style={styles.boxText}>Distanza</Text>
              {this._renderIcon('compass')}
              <Text style={styles.boxText}>{this.state.artist.distance}</Text>
            </View>
            <View style={[styles.box, styles.boxBottomCenter]}>
              <Text style={styles.boxText}>Vitto</Text>
              {this._renderIcon('cutlery')}
              <Text style={styles.boxText}>
                {this.state.artist.dinner ? 'si' : 'no'}
              </Text>
            </View>
            <View style={[styles.box, styles.boxBottomRight]}>
              <Text style={styles.boxText}>Alloggio</Text>
              {this._renderIcon('bed')}
              <Text style={styles.boxText}>
                {this.state.artist.overnight ? 'si' : 'no'}
              </Text>
            </View>
          </View>

          <Text style={[styles.text, styles.bio]}>
            {this.state.artist.bio}
          </Text>
        </View>
      </ScrollView>
    );
  }

  _goToLocations() {
    this.props.navigator.push({
      title: 'Scegli la location',
      component: Locations,
      backButtonTitle: 'Indietro',
      rightButtonTitle: 'Nuova',
      onRightButtonPress: () => this._goToNewLocation(),
      passProps: {
        artist: this.state.artist,
        user: this.state.user,
        from: 'artist'
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

  _renderIcon(name) {
    return (
      <Icon
        name={name}
        size={22}
        color="#CCC"
        style={styles.boxIcon}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ED253C',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#F8F8F8',
    backgroundColor: '#F8F8F8'
  },
  boxContainerTop: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  boxContainerBottom: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  box: {
    flex: 2,
    padding: 10,
    borderColor: '#E8E8E8'
  },
  boxTopLeft: {
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
  boxTopCenter: {
    borderBottomWidth: 1
  },
  boxTopRight: {
    borderLeftWidth: 1,
    borderBottomWidth: 1
  },
  boxBottomLeft: {
    borderRightWidth: 1
  },
  boxBottomRight: {
    borderLeftWidth: 1
  },
  boxIcon: {
    textAlign:'center',
    padding: 10
  },
  boxText: {
    textAlign: 'center'
  },
  bio: {
    marginTop: 20
  },
  title: {
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  image: {
    height: 200,
    backgroundColor: '#DDD'
  }

});

export default Artist;
