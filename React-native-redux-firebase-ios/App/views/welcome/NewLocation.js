/**
 * NewLocation Component
 */

'use strict';

import React from 'react-native';
import Helpers from '../../utils/Helpers';

import LocationActions from '../../actions/LocationActions';
import LocationStore from '../../stores/LocationStore';

import Select from '../../components/Select';
import SelectImage from '../../components/SelectImage';
import SelectAddress from '../../components/SelectAddress';

const {
  Component,
  StyleSheet,
  Text,
  TextInput,
  MapView,
  AlertIOS,
  TouchableOpacity,
  View,
  ScrollView
} = React;

const tipologia = {
  'mansion' : 'Villa/Casa singola',
  'apartment' : 'Appartamento',
  'multifamily' : 'Villetta multifamiliare',
  'warehouse' : 'Stabile/magazzino'
};

const spazio = {
  '<20' : 'Meno di 20mq',
  '20-40' : 'Da 20mq a 40mq',
  '40-60' : 'Da 40mq a 60mq',
  '60-100' : 'Da 60mq a 100mq',
  '>100' : 'Oltre 100mq'
};

const persone = {
  '<=10' : 'Fino a 10 persone',
  '10-20' : 'Da 10 a 20 persone',
  '20-30' : 'Da 20 a 30 persone',
  '30-40' : 'Da 30 a 40 persone',
  '40-50' : 'Da 40 a 50 persone',
  '>50' : 'Oltre 50 persone'
};

class NewLocation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      region: {
        latitude: 40.941728,
        longitude: 3.5839248,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0
      },
      isLocationCreated: LocationStore.isLocationCreated()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    LocationStore.addChangeListener(this._onChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.isLocationCreated) {
      this._confirmAndGetBack();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentWillUnmount() {
    LocationStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <ScrollView
        ref='scrollView'
        style={styles.container}
        contentInset={{ bottom: 112 }}
        keyboardDismissMode={'on-drag'}>
        <SelectAddress
          placeholder='Indirizzo (es. Via Tommaseo 49, Brescia)'
          setAddress={(data, details) => {
            this._setAddress(data, details);
          }}
        />
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          annotations={this.state.annotations}
        />
        <View style={styles.details}>
          <View style={[styles.section, styles.sectionFirst]}>
            <TextInput
              placeholder='Nome'
              onChangeText={(nome) => {
                this.setState({nome: nome});
              }}
              style={styles.formText}
            />
          </View>
          <View style={styles.section}>
            <TextInput
              placeholder='Descrizione'
              multiline={true}
              onFocus={() => {
                this.refs.scrollView.getScrollResponder().scrollTo({y: 100});
              }}
              onChangeText={(descrizione) => {
                this.setState({descrizione: descrizione});
              }}
              style={styles.descriptionText}
            />
          </View>
          <View style={styles.section}>
            <Select
              data={Object.keys(tipologia).map(key => tipologia[key])}
              placeholder='Tipologia'
              selected={(selected) => {
                this.setState({
                  tipologia: selected
                });
              }}
            />
          </View>
          <View style={styles.section}>
            <Select
              data={Object.keys(spazio).map(key => spazio[key])}
              placeholder='Spazio a disposizione'
              selected={(selected) => {
                this.setState({
                  spazio: selected
                });
              }}
            />
          </View>
          <View style={styles.section}>
            <Select
              data={Object.keys(persone).map(key => persone[key])}
              placeholder='Numero max di persone'
              selected={(selected) => {
                this.setState({
                  persone: selected
                });
              }}
            />
          </View>
          <View style={styles.section}>
            <SelectImage
              placeholder='Immagine'
              selected={(selected) => {
                this.setState({
                  immagine: selected
                });
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._createLocation()}>
            <Text style={styles.buttonText}>Crea la tua location</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _setAddress(data, details) {
    this.setState({
      region: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0
      },
      annotations: [{
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        animateDrop: true
      }],
      indirizzo: data.description,
      isRegionSelected: true
    });
  }

  _createLocation() {

    const user = this.props.user.facebook.displayName;
    const name = user.substr(0, user.indexOf(' '));

    if(this.state.nome && this.state.descrizione && this.state.tipologia &&
      this.state.spazio && this.state.persone && this.state.immagine
      && this.state.isRegionSelected) {

      AlertIOS.prompt(
        'Guestar',
        'Hey ' + name + '! 😊\nSei pronto a creare la tua location?',
        [{text: 'Crea', onPress: (text) => {

            const type = Helpers.getKeyByValue(tipologia, this.state.tipologia);
            const space = Helpers.getKeyByValue(spazio, this.state.spazio);
            const people = Helpers.getKeyByValue(persone, this.state.persone);

            const locationData = {
              uid: this.state.user.uid,
              name: this.state.nome,
              description: this.state.descrizione,
              address: this.state.indirizzo,
              type: {
                key: type,
                value: this.state.tipologia
              },
              space: {
                key: space,
                value: this.state.spazio
              },
              people: {
                key: people,
                value: this.state.persone
              },
              image: this.state.immagine.uri,
              location: {
                lat: this.state.region.latitude,
                lng: this.state.region.longitude
              }
            };

            LocationActions.createLocation(locationData);

          }, type: 'plain-text'},
        {text: 'Annulla', style: 'cancel'}],
        'default'
      );
    }
    else {
      let message = '';

      if(!this.state.nome)
        message += '- Nome della location\n';
      if(!this.state.descrizione)
        message += '- Descrizione della location\n';
      if(!this.state.isRegionSelected)
        message += '- Indirizzo della location\n';
      if(!this.state.immagine)
        message += '- Immagine della location\n';
      if(!this.state.tipologia)
        message += '- Tipologia della location\n';
      if(!this.state.spazio)
        message += '- Spazio a disposizione\n';
      if(!this.state.persone)
        message += '- Numero massimo di persone';

      AlertIOS.prompt(
        'Guestar',
        'Hey ' + name + '! 😊\nHai dimenticato questi dati:\n\n' + message,
        [{text: 'OK'}],
        'default'
      );
    }
  }

  _confirmAndGetBack() {
    AlertIOS.prompt(
      'Guestar',
      'Location creata! 😊',
      [{
        text: 'OK',
        onPress: (text) => this.props.navigator.pop()
      }],
      'default'
    );
  }

  _onChange() {
    this.setState({
      isLocationCreated: LocationStore.isLocationCreated()
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  details: {
    marginBottom: 0
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  map: {
    flex: 1,
    height: 150
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ED253C',
    padding: 10,
    margin: 20,
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  sectionFirst: {
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20
  },
  modalContainer: {
    position: 'absolute',
    alignItems: 'center',
    height: 320,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#DDD',
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    opacity: 0.95
  },
  modalInnerContainer: {
    alignItems: 'center'
  },
  formText: {
    height: 40,
    fontSize: 17
  },
  descriptionText: {
    height: 80,
    fontSize: 17
  },
  tipologiaButton: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default NewLocation;
