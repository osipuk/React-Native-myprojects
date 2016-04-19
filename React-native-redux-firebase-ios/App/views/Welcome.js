import React from 'react-native';
import WelcomeActions from '../actions/WelcomeActions';
import WelcomeStore from '../stores/WelcomeStore';

import Artist from './welcome/Artist';

const {
  Component,
  Image,
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 150,
  },
  infoText: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: 24,
  },
  infoTextBottom: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    shadowColor: '#666',
    shadowRadius: 3,
    shadowOpacity: 100,
    shadowOffset: { width: 1, height: 1 },
  },
  name: {
    fontSize: 30,
  },
  genre: {
    fontSize: 16,
  },
});

class Welcome extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 }
    );

    this.state = {
      artists: dataSource.cloneWithRows(WelcomeStore.getArtists()),
      isLoading: WelcomeStore.isLoading(),
      user: this.props.user,
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    WelcomeStore.addChangeListener(this._onChange);
    setTimeout(() => WelcomeActions.getArtists());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.artists !== this.state.artists;
  }

  componentWillUnmount() {
    WelcomeStore.removeChangeListener(this._onChange);
  }

  _getArtistInfo(artist) {
    const baseURL = 'https://guestar.firebaseapp.com/images/';
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._goToArtist(artist)}
        >
          <Image
            style={styles.image}
            source={{ uri: baseURL + artist.imageHorizontal }}
          />
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, styles.name]}
            >
              {artist.name}
            </Text>
            <Text
              style={[styles.text, styles.genre]}
            >
              {artist.genres.join(', ')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _goToArtist(artist) {
    this.props.navigator.push({
      title: artist.name,
      component: Artist,
      backButtonTitle: 'Indietro',
      passProps: {
        artist,
        user: this.state.user,
      },
    });
  }

  _onChange() {
    this.setState({
      isLoading: WelcomeStore.isLoading(),
      artists: this.state.artists.cloneWithRows(
        WelcomeStore.getArtists()
      ),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ?
          <View>
            <Text style={styles.infoText}>
              Carico gli artisti...
            </Text>
            <Text style={styles.infoTextBottom}>
              Attendi mentre vengono caricati!
            </Text>
          </View>
        :
          this.state.artists._cachedRowCount !== 0 ?
            <ListView
              style={styles.container}
              dataSource={this.state.artists}
              renderRow={(rowData) => this._getArtistInfo(rowData)}
              contentInset={{ bottom: 112 }}
            />
          :
            <View>
              <Text style={styles.infoText}>
                Nessun artista
              </Text>
              <Text style={styles.infoTextBottom}>
                Ci deve essere qualche problema :S
              </Text>
            </View>
        }
      </View>
    );
  }

}

Welcome.propTypes = {
  navigator: PropTypes.object,
  user: PropTypes.object,
};

export default Welcome;
