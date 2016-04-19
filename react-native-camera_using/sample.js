/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var CameraView = require('react-native-android-camera');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} = React;

var Camera = React.createClass({
  cameraView: null,
  toggleMode: true,
  render: function() {
    return (
      <View style={styles.container}>
        <CameraView
            ref={(cameraView)=>{this.cameraView = cameraView;}}
            style={styles.cameraView}
            torchMode={this.toggleMode}
            onBarCodeRead={(result) => {
                Alert.alert("Barcode Captured", JSON.stringify(result));
            }}
        >
          <View style={styles.cameraViewArea}>
            <View style={styles.topArea}></View>

            <View style={styles.captureArea}>

              <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => {
                    this.toggleMode = !this.toggleMode;
                    this.cameraView.toggleTorch(this.toggleMode);
                }}>
                <Image style={styles.bottom_logo}
                       source={require('image!img_logo')} />
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => {
                  this.cameraView.capture(function(result) {
                    Alert.alert("Camera Image Capture Completed", result);
                  });
                }}>
                <Text style={styles.capture_label}> Capture Image </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection:'column'
  },
  cameraView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection:'column',
    width :vw * 100
  },
  cameraViewArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    flex: 1,
    backgroundColor: 'rgba(52,52,52, 0)'
  },
  topArea: {
    flex:4,
    width :vw * 100,
  },
  captureArea: {
    flex:1,
    width :vw * 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture_label: {
    flex:1,
    width :vw * 100,
    fontSize: vh * 3,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#d0d0d0',
    alignItems: 'center',
  },

  bottom_logo :{
    width: vw * 6,
    height: vw * 6
  }
});

AppRegistry.registerComponent('Camera', () => Camera);
