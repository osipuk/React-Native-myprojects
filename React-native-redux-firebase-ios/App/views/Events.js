/**
 * Events Component
 */

'use strict';

import React from 'react-native';

import EventStore from '../stores/EventStore';
import EventActions from '../actions/EventActions';
import Event from './events/Event';

const { 
  Component, 
  StyleSheet, 
  View, 
  Text,
  SegmentedControlIOS,
  ListView,
  Image,
  TouchableOpacity
} = React;

class Events extends Component {
    
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      section: 'all',
      selectedIndex: 0,
      events: dataSource.cloneWithRows(EventStore.getEvents()),
      isLoading: EventStore.isLoading(),
      user: this.props.user,
      from: this.props.from
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);

    if(this.state.from === 'home') {
      EventActions.getEvents();
    }
    else if(this.state.from === 'dashboard') {
      EventActions.getEvents(this.state.user.uid);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.events !== this.state.events;
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);    
  }

  render() {
    return (
      <View style={styles.container}>
        {(this.state.from === 'home') ?
          <View style={styles.selectEvents}>
            <SegmentedControlIOS 
              values={['Tutti', 'Personali']} 
              selectedIndex={this.state.selectedIndex}
              tintColor='#ED253C'
              onChange={(event) => this._selectSection(event)}
            />
          </View>
        :
          <View />
        }
        <View style={styles.container}>
          {this.state.isLoading ?
            <View>
              <Text style={styles.infoText}>
                Carico gli eventi...
              </Text>
              <Text style={styles.infoTextBottom}>
                Attendi mentre vengono caricati!
              </Text>
            </View>
          :
            this.state.events._cachedRowCount !== 0 ?
              <ListView
                dataSource={this.state.events}
                renderRow={(rowData) => this._getEventInfo(rowData)}
                contentInset={{ bottom: 112 }}
              />
            :
              <View>
                <Text style={styles.infoText}>
                  Nessun evento
                </Text>
                <Text style={styles.infoTextBottom}>
                  Seleziona un artista e crea il tuo evento!
                </Text>
              </View>
          }
        </View>        
      </View>
    );
  }

  _getEventInfo(event) {  

    const date = new Date(event.date);
    const dateString = date.toLocaleDateString();

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._goToEvent(event)}>          
          <Image 
            style={styles.image}
            source={{ uri: event.image.uri }}
          />        
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, styles.name]}>
              {event.name}
            </Text>
            <Text
              style={[styles.text, styles.artist]}>
              {event.artist.name}
            </Text>
            <Text
              style={[styles.text, styles.locationAndDate]}>
              {event.location.name} - {dateString}
            </Text>
          </View>
        </TouchableOpacity>
      </View>        
    );
  }

  _goToEvent(event) {
    this.props.navigator.push({
      title: event.name,
      component: Event,
      backButtonTitle: 'Indietro',      
      passProps: { event: event }
    });
  }  
  
  _selectSection(event) {
    if(event.nativeEvent.selectedSegmentIndex === 0) {
      if(this.state.selectedIndex !== 0) {
        EventActions.getEvents();
      }
      this.setState({
        selectedIndex: 0
      });      
    }
    else if(event.nativeEvent.selectedSegmentIndex === 1) {
      if(this.state.selectedIndex !== 1) {
        EventActions.getEvents(this.state.user.uid);
      }
      this.setState({
        selectedIndex: 1
      });      
    }
  } 

  _onChange() {
    this.setState({
      isLoading: EventStore.isLoading(),
      events: this.state.events.cloneWithRows(
        EventStore.getEvents()
      )
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  selectEvents: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 15
  },
  map: {
    flex: 1,
    height: 250
  },
  image: {
    height: 150
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
    fontSize: 24
  },
  artist: {
    fontSize: 20
  },
  locationAndDate: {
    fontSize: 16
  }
});

export default Events;