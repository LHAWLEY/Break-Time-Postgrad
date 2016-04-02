/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var Main = require('./views/main.ios')
var TimeBlock = require('./views/timeBlock.ios')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

class BreakTime extends Component {
  render() {
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute={{
          title: 'Main',
          component: Main
      }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('BreakTime', () => BreakTime);
