/**
 * MapTextInput component
 */

'use strict';

import React from 'react-native';
import { 
  GooglePlacesAutocomplete 
} from 'react-native-google-places-autocomplete';

const { 
  Component, 
  StyleSheet
} = React;

class SelectAddress extends Component {

  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder={this.props.placeholder}
        minLength={2}
        autoFocus={false}
        currentLocation={false}
        currentLocationLabel='Utilizza posizione corrente'
        nearbyPlacesAPI='GoogleReverseGeocoding'
        fetchDetails={true}
        onPress={(data, details = null) => {
          this.props.setAddress && this.props.setAddress(data, details);
        }}
        getDefaultValue={() => {
          return '';
        }}
        query={{
          key: 'AIzaSyCreHSBv6EMwBkvfeI39iaPtqVa_6RG7Ys',
          language: 'it',
          types: 'address',
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
          row: styles.row
        }}
      />
    );
  }

}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: '#FFF',
    borderTopColor: '#FFF',
    borderBottomColor: '#FFF',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 50,
    paddingTop: 6.5,
    paddingBottom: 6.5,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 0,
    fontSize: 17,
  },
  listView: {
    flex: 1,
    marginTop: 10,
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    height: 45
  },
  row: {
    paddingLeft: 20,
    height: 44
  }
});

export default SelectAddress;
