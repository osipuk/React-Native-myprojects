/**
 * Select component
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
  TextInput,
  Modal,
  PickerIOS
} = React;

class Select extends Component {

  constructor(props) {
    super(props);

    this.data = this.props.data;
    this.state = {
      visible: false
    };    
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this._setModalVisible(true)}>
          <TextInput
            editable={false}
            placeholder={this.props.placeholder}
            style={styles.formText}
            value={this.state.selected}
          />
        </TouchableOpacity>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.visible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInnerContainer}>
              <PickerIOS
                selectedValue={this.state.selected}
                onValueChange={(selected) => {
                  this._changeValue(selected);
                }}
                style={{width: 300}}>
                {this.data.map((val) =>
                  <PickerIOS.Item
                    value={val}
                    key={val}
                    label={val.toString()}
                  />
                )}
              </PickerIOS>     
              <TouchableOpacity
                style={styles.button}
                onPress={() => this._setModalVisible(false)}>
                <Text
                  style={styles.closeButton}>
                  Chiudi
                </Text>
              </TouchableOpacity>               
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _changeValue(selected) {
    this.setState({selected: selected});
    this.props.selected && this.props.selected(selected);
  }

  _setModalVisible(visible) {
    this.setState({
      visible: visible
    });
  }

}

const styles = StyleSheet.create({
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
    margin: 20,
    justifyContent: 'center'
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
    opacity: 0.98
  },
  modalInnerContainer: {
    alignItems: 'center'
  },
  formText: {
    height: 40
  },
  closeButton: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default Select;
