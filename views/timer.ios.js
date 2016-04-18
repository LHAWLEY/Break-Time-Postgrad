import React, {
  Alert,
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  NavigatorIOS,
  View
} from 'react-native';


var CountDown = require('./timerlogic.ios');
var TimeBlock = require('./timeBlock.ios');
var alertMessage = 'Confirm exit'
class Timer extends Component {

  GoToMainPage() {
    this.props.navigator.popToTop()
  }

  render(){
    return(
      <View style={styles.container}>
        <CountDown
          text={"Remaining Time"}
          breakActivity={this.props.breakActivity}
          breaktime={this.props.breaktime}
          worktime={this.props.worktime}
          navigator = {this.props.navigator}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="#9BE8FF"
          onPress={() => Alert.alert(
            'Exit',
            alertMessage,
            [
              {text: 'Yes', onPress: () => this.GoToMainPage()},
              {text: 'No', onPress: () => console.log('no')}
            ]
            )}>
          <Text style={styles.buttonText}>
            Stop
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    backgroundColor: '#05B3DD',
    margin: 15,
    borderRadius: 8.150,
    width: 300,
    height: 45
  },
  buttonText: {
    textAlign: 'center',
    margin: 15
  }
});


module.exports = Timer;
