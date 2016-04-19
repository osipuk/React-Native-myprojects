/**
 * SelectDate component
 */

'use strict';

import React from 'react-native';

const { 
  Component,
  PropTypes,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  DatePickerIOS
} = React;

class SelectDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      timeZoneOffsetInHours: props.timeZoneOffsetInHours,
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
            value={this.state.dateString}
          />
        </TouchableOpacity>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.visible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInnerContainer}>
              <DatePickerIOS
                date={this.state.date}
                mode='date'
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={(date) => this._onDateChange(date)}
              />
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

  _onDateChange(date) {

    const day = date.getDate();
    const month = date.getMonth();
    let monthName = '';

    switch(month) {
      case 0: monthName = 'Gennaio'; break;
      case 1: monthName = 'Febbraio'; break;
      case 2: monthName = 'Marzo'; break;
      case 3: monthName = 'Aprile'; break;
      case 4: monthName = 'Maggio'; break;
      case 5: monthName = 'Giugno'; break;
      case 6: monthName = 'Luglio'; break;
      case 7: monthName = 'Agosto'; break;
      case 8: monthName = 'Settembre'; break;
      case 9: monthName = 'Ottobre'; break;
      case 10: monthName = 'Novembre'; break;
      case 11: monthName = 'Dicembre'; break;
    }

    const year = date.getFullYear();
    const dateString = day + ' ' + monthName + ' ' + year;

    this.setState({
      date: date,
      dateString: dateString
    });

    this.props.selected && this.props.selected(date);
  }

  _setModalVisible(visible) {
    this.setState({
      visible: visible
    });
  }
}

SelectDate.defaultProps = { 
  date: new Date(),
  timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
};

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
    height: 340,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#DDD',
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    opacity: 0.98
  },
  modalInnerContainer: {
    alignItems: 'center',
    paddingTop: 20
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

export default SelectDate;
