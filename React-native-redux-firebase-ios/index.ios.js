/**
 * Guestar
 * http://guestar.com
 */

'use strict';

import React from 'react-native';
import Home from './App/views/Home';

const {
  AppRegistry,
  Component,
  StyleSheet,
  View,
} = React;

class Guestar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('guestar', () => Guestar);
