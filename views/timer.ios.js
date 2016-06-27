import React, {
  // AppStateIOS, this is for when push notifications get added.
  Image,
  View,
  StyleSheet
} from 'react-native';


var CountDown = require('./timerlogic.ios'),
    TimeBlock = require('./timeBlock.ios')

var Timer = React.createClass ({
  render(){
    return(
      <View style={styles.timerBackground}>
        <Image source={require('../imgs/coffeebreak.jpg')} style={styles.backgroundImage}>
          <View style={styles.container}>
            <CountDown
              breakActivity={this.props.breakActivity}
              breakTime={this.props.breaktime}
              workTime={this.props.worktime}
              navigator = {this.props.navigator}/>
          </View>
        </Image>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  timerBackground: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    marginTop:60,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Timer;
