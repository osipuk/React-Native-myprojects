/**
 * SelectImage component
 */

'use strict';

import React from 'react-native';
import _ from 'lodash';

const {
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  TextInput,
  Modal,
  NativeModules: { ImagePickerManager }
} = React;

const {
  width,
  height
} = Dimensions.get('window');

class SelectImage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: {
        uri: '',
        text: '',
        isStatic: true
      },
      visible: false
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if(this.state.selected.uri === '')
              this._selectImage();
            else
              this._setModalVisible(true);
          }}>
          <TextInput
            editable={false}
            placeholder={this.props.placeholder}
            style={styles.formText}
            value={this.state.selected.text}
          />
        </TouchableOpacity>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.visible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInnerContainer}>
              <Image
                style={styles.avatar}
                source={this.state.selected}
                resizeMode={'cover'}
              />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonGrey]}
                  onPress={() => {
                    this._selectImage();
                  }}>
                  <Text style={styles.buttonText}>Cambia</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this._setModalVisible(false)}>
                  <Text style={styles.buttonText}>Chiudi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _selectImage() {

    this._setModalVisible(false);

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
            text: 'Immagine (visualizza)',
            isStatic: true
          };

          this.setState({ selected: source });
          this.props.selected && this.props.selected(source);
          this._setModalVisible(true);
        }
      }
    });
  }

  _setModalVisible(visible) {
    this.setState({
      visible: visible
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    width: (width - 40),
    height: 200,
    margin: 20,
    marginTop: 30,
    backgroundColor: '#FFF'
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#ED253C',
    borderColor: '#DB2033',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center'
  },
  buttonGrey: {
    backgroundColor: '#333',
    borderColor: '#444',
  },
  modalContainer: {
    position: 'absolute',
    alignItems: 'center',
    height: 320,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#DDD',
    opacity: 0.98
  },
  modalInnerContainer: {
    alignItems: 'center'
  },
  formText: {
    height: 40
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default SelectImage;
