/**
 * NewEvent Component
 */

'use strict';

import React from 'react-native';
import Helpers from '../../utils/Helpers';

import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';

import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDate from '../../components/SelectDate';

const {
  Component,
  StyleSheet,
  Text,
  TextInput,
  Image,
  AlertIOS,
  TouchableOpacity,
  View,
  ScrollView,
  NativeModules: { ImagePickerManager }
} = React;

class NewEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      immagine: null,
      isEventCreated: EventStore.isEventCreated()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.isEventCreated) {
      this._confirmAndGetBack();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <ScrollView
        ref='scrollView'
        style={styles.container}
        contentInset={{ bottom: 112 }}
        keyboardDismissMode={'on-drag'}>

        <TouchableOpacity
          style={this.state.immagine ?
            styles.imagePlaceholder : styles.textPlaceholder}
          onPress={() => this._selectImage()}>
          {this.state.immagine ?
            <Image
              style={styles.image}
              source={this.state.immagine}
              resizeMode={'cover'}
            />
            :
            <View style={styles.imageButton}>
              <Icon name='picture-o' size={46} color="#BBB"
                style={styles.imageButtonIcon} />
              <Text style={styles.imageButtonText}>
                Seleziona un'immagine
              </Text>
            </View>
          }
        </TouchableOpacity>

        <View style={styles.details}>
          <View style={[styles.section, styles.sectionFirst]}>
            <TextInput
              placeholder='Nome evento'
              onChangeText={(nome) => {
                this.setState({nome: nome});
              }}
              style={styles.formText}
            />
          </View>
          <View style={styles.section}>
            <TextInput
              placeholder='Descrizione evento'
              multiline={true}
              onFocus={() => {
                this.refs.scrollView.getScrollResponder().scrollTo({ y: 100 });
              }}
              onChangeText={(descrizione) => {
                this.setState({descrizione: descrizione});
              }}
              style={styles.descriptionText}
            />
          </View>
          <View style={styles.section}>
            <TextInput
              editable={false}
              placeholder='Artista'
              style={styles.formText}
              value={this.props.artist.name}
            />
          </View>
          <View style={styles.section}>
            <TextInput
              editable={false}
              placeholder='Location'
              style={styles.formText}
              value={this.props.location.name}
            />
          </View>
          <View style={styles.section}>
            <SelectDate
              placeholder='Data evento'
              selected={(selected) => {
                this.setState({
                  data: selected
                });
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._createEvent()}>
            <Text style={styles.buttonText}>Crea il tuo evento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _createEvent() {

    const user = this.props.user.facebook.displayName;
    const name = user.substr(0, user.indexOf(' '));

    if(this.state.nome && this.state.descrizione &&
      this.state.data && this.state.immagine) {

        AlertIOS.prompt(
        'Guestar',
        'Hey ' + name + '! 😊\nSei pronto a creare il tuo evento?',
        [{text: 'Crea', onPress: (text) => {

            const eventData = {
              artist: {
                id: this.props.artist.id,
                name: this.props.artist.name
              },
              date: this.state.data.toString(),
              description: this.state.descrizione,
              image: this.state.immagine,
              location: {
                name: this.props.location.name,
                lat: this.props.location.location.lat,
                lng: this.props.location.location.lng
              },
              name: this.state.nome,
              uid: this.props.user.uid,
              user: {
                name: this.props.user.facebook.displayName,
                email: this.props.user.facebook.email,
                profileImageURL: this.props.user.facebook.profileImageURL
              }
            };

            EventActions.createEvent(eventData);

          }, type: 'plain-text'},
        {text: 'Annulla', style: 'cancel'}],
        'default'
      );
    }
    else {
      let message = '';

      if(!this.state.nome)
        message += '- Nome dell\'evento\n';
      if(!this.state.descrizione)
        message += '- Descrizione dell\'evento\n';
      if(!this.state.data)
        message += '- Data dell\'evento\n';
      if(!this.state.immagine)
        message += '- Immagine dell\'evento';

      AlertIOS.prompt(
        'Guestar',
        'Hey ' + name + '! 😊\nHai dimenticato questi dati:\n\n' + message,
        [{text: 'OK'}],
        'default'
      );
    }
  }

  _selectImage() {
    const options = {
      title: 'Seleziona un\'immagine',
      cancelButtonTitle: 'Annulla',
      takePhotoButtonTitle: 'Scatta una foto...',
      chooseFromLibraryButtonTitle: 'Scegli dalla libreria...',
      maxWidth: 400,
      maxHeight: 400,
      quality: 1,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          const source = {
            uri: 'data:image/jpeg;base64,' + response.data,
            isStatic: true
          };

          this.setState({ immagine: source });
        }
      }
    });
  }

  _confirmAndGetBack() {
    AlertIOS.prompt(
      'Guestar',
      'Evento creato! 😊\nLo troverai nella scheda \'Eventi\'',
      [{
        text: 'OK',
        onPress: (text) => {
          this.props.navigator.popToTop();
        }
      }],
      'default'
    );
  }

  _onChange() {
    this.setState({
      isEventCreated: EventStore.isEventCreated()
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 200
  },
  imagePlaceholder: {
    height: 200
  },
  textPlaceholder: {
    height: 200,
    backgroundColor: '#EEE',
    justifyContent: 'center'
  },
  imageButton: {
    alignItems: 'center'
  },
  imageButtonIcon: {
    marginBottom: 10
  },
  imageButtonText: {
    color: '#AAA',
    fontSize: 16
  },
  details: {
    marginBottom: 0
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ED253C',
    padding: 10,
    margin: 20,
    borderRadius: 5
  },
  buttonImage: {
    backgroundColor: '#666'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  sectionFirst: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
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

export default NewEvent;
