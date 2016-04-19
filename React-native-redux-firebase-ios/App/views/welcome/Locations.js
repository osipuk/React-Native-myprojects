/**
 * Locations Component
 */

'use strict';

import React from 'react-native';

import NewEvent from './NewEvent';
import Location from '../dashboard/Location';

import LocationStore from '../../stores/LocationStore';
import LocationActions from '../../actions/LocationActions';

const { 
  Component, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View,
  Image,
  ListView 
} = React;

class Locations extends Component {
    
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      locations: dataSource.cloneWithRows(LocationStore.getLocations()),
      isLoading: LocationStore.isLoading(),
      from: this.props.from
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    LocationStore.addChangeListener(this._onChange);
    LocationActions.getLocations(this.props.user.uid);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.locations !== this.state.locations;
  }

  componentWillUnmount() {
    LocationStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ?
          <View>
            <Text style={styles.infoText}>
              Carico le location...
            </Text>
            <Text style={styles.infoTextBottom}>
              Attendi mentre vengono caricate!
            </Text>
          </View>
        :
          this.state.locations._cachedRowCount !== 0 ?
            <ListView
              dataSource={this.state.locations}
              renderRow={(rowData) => this._getLocationsInfo(rowData)}
              contentInset={{ bottom: 112 }}  
            />
          :
            <View>
              <Text style={styles.infoText}>
                Nessuna location
              </Text>
              <Text style={styles.infoTextBottom}>
                Fai tap su 'Nuova' per crearne una!
              </Text>
            </View>
        }
      </View>
    );
  }

  _getLocationsInfo(location) {  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if(this.state.from === 'artist') {
              this._goToNewEvent(location);
            } 
            else if(this.state.from === 'dashboard') {
              this._goToLocation(location);
            }            
          }}>
          <Image 
            style={styles.image}
            source={{ uri: location.image }}
          />
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, styles.name]}>
              {location.name}
            </Text>
            <Text
              style={[styles.text, styles.address]}>
              {location.address}
            </Text>
          </View>
        </TouchableOpacity>
      </View>     
    );
  }

  _goToNewEvent(location) {
    this.props.navigator.push({
      title: 'Nuovo evento',
      component: NewEvent,
      passProps: { 
        user: this.props.user,
        artist: this.props.artist,
        location: location
      }
    });
  }

  _goToLocation(location) {
    this.props.navigator.push({
      title: location.name,
      component: Location,
      passProps: { 
        user: this.props.user,
        location: location
      }
    });
  }
  
  _onChange() {
    this.setState({
      isLoading: LocationStore.isLoading(),
      locations: this.state.locations.cloneWithRows(
        LocationStore.getLocations()
      )
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  infoText: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: 24
  },
  infoTextBottom: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  image: {
    height: 150
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    shadowColor: '#666',
    shadowRadius: 3,
    shadowOpacity: 100,
    shadowOffset: { width: 1, height : 1}
  },
  name: {
    fontSize: 30
  },
  address: {
    fontSize: 16
  }
});

export default Locations;
