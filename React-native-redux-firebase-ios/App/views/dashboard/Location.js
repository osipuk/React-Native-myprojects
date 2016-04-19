/**
 * Location Component
 */

'use strict';

import React from 'react-native';

const { 
  Component, 
  StyleSheet, 
  ScrollView,
  Image,
  View, 
  Text
} = React;

class Location extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location
    };
  }

  render() {
    return (
      <ScrollView 
        ref='scrollView'
        style={styles.container}
        contentInset={{ bottom: 112 }}
        keyboardDismissMode={'on-drag'}>

        <Image 
          style={styles.image} 
          source={{uri: this.state.location.image}}
          resizeMode={'cover'}
        />

        <View style={[styles.section, styles.sectionFirst]}>
          <View style={styles.sectionDescription}>
            <Text style={[styles.text, styles.textLeft, styles.textBold]}>
              Indirizzo
            </Text>
            <Text style={[styles.text, styles.textLeft, styles.descrText]}>
              {this.state.location.address}
            </Text>
          </View>
        </View>
        <View style={[styles.section]}>
          <View style={styles.sectionDescription}>
            <Text style={[styles.text, styles.textLeft, styles.textBold]}>
              Descrizione
            </Text>
            <Text style={[styles.text, styles.textLeft, styles.descrText]}>
              {this.state.location.description}
            </Text>
          </View>
        </View>  
        <View style={[styles.section]}>
          <View style={styles.sectionText}>
            <Text style={[styles.text, styles.textLeft, styles.textBold]}>
              Tipologia
            </Text>
            <Text style={[styles.text, styles.textRight]}>
              {this.state.location.type.value}
            </Text>
          </View>
        </View>
        <View style={[styles.section]}>
          <View style={styles.sectionText}>
            <Text style={[styles.text, styles.textLeft, styles.textBold]}>
              Spazio
            </Text>
            <Text style={[styles.text, styles.textRight]}>
              {this.state.location.space.value}
            </Text>
          </View>
        </View>
        <View style={[styles.section, styles.sectionLast]}>
          <View style={styles.sectionText}>
            <Text style={[styles.text, styles.textLeft, styles.textBold]}>
              Persone
            </Text>
            <Text style={[styles.text, styles.textRight]}>
              {this.state.location.people.value}
            </Text>
          </View>
        </View>      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 200
  },
  sectionFirst: {
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },
  sectionLast: {
    borderBottomWidth: 0
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20
  },
  sectionText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionDescription: {
    flex: 1
  },
  text: {
    fontSize: 17
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
  textBold: {
    fontWeight: 'bold'
  },
  descrText: {
    marginTop: 10
  }
});

export default Location;