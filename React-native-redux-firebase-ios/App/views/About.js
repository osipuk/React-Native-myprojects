/**
 * About Component
 */

'use strict';

import React from 'react-native';

const {
  Component,
  StyleSheet,
  SegmentedControlIOS,
  ScrollView,
  Dimensions,
  View,
  Image,
  Text
} = React;

const {
  width,
  height
} = Dimensions.get('window');

class About extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };

    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.selectSection}>
          <SegmentedControlIOS
            values={['Info', 'FAQ']}
            selectedIndex={this.state.selectedIndex}
            tintColor='#ED253C'
            onChange={this._onChange}
          />
        </View>

        <ScrollView
          contentInset={{ bottom: 112 }}>

          {this.state.selectedIndex === 0 ?
            <View style={styles.info}>

              <Image
                style={styles.image}
                source={{ uri: 'guestar_pattern_about.png', isStatic: true }}>
              </Image>

              <Text style={styles.title}>
                Guestar ti mette in contatto con tutti i tuoi artisti
                preferiti: proponi un evento epico e fatti scegliere
              </Text>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Inserisci tutte le tue location
                </Text>
                <Text style={styles.sectionText}>
                  Case private, baite in montagna, bungalow sulla spiaggia.
                  Ogni luogo può diventare sede di un evento epico,
                  inserisci il tuo.
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Crea il tuo evento
                </Text>
                <Text style={styles.sectionText}>
                  Descrivi la tua idea, carica fotografie e video. Non
                  dimenticare tutte le informazioni tecniche (luci,
                  elettricità, ..) e logistiche (accessibilità,
                  dimensioni, orari).
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Fatti scegliere
                </Text>
                <Text style={styles.sectionText}>
                  Rendi il tuo evento unico, aggiornalo, condividilo
                  e fatti notare. Gli eventi più visitati e più discussi
                  diventeranno "ONFIRE".
                </Text>
              </View>
            </View>
          :
            <View style={styles.faq}></View>
          }
        </ScrollView>
      </View>
    );
  }

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: width,
    height: (width * 248) / 500,
    backgroundColor: '#DDD'
  },
  selectSection: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 15
  },
  title: {
    fontSize: 20,
    margin: 20
  },
  section: {
    margin: 20,
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CE2132',
    textAlign: 'left',
    marginBottom: 15
  },
  sectionText: {
    fontSize: 15,
    textAlign: 'left'
  }
});

export default About;
