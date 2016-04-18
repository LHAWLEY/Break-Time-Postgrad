// cannot receive alert when on home screen or in lock mode.  
// if user comes back before time is up then they will receive the alert

import React, {
    Alert,
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    NavigatorIOS,
    Vibration
} from 'react-native';

var moment = require('moment');
var TimerMixin = require('react-timer-mixin');
var AudioPlayer = require('react-native-audioplayer');
var StatsPage = require('./stats.ios');

var alertBreakMessage = 'BREAK TIME !';
var alertWorkMessage = 'get to work!!!!';

var CountDown = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function () {
    return {
      workExpiry:  moment().add(this.props.worktime, 'seconds'),
      breakExpiry: moment().add(this.props.breaktime, 'seconds'),
      onBreak: false,
      cycles: 0
    };
  },

  componentDidMount(){
    this.interval = setInterval(function () {
      this._onTick();
    }.bind(this), 1000); 
  },

  componentWillUnmount(){
    clearInterval(this.interval); 
  },

  _onTick() {
    this.forceUpdate();
    if (this.shouldSoundAlarm()){
       this.alarm();
    }
  },

  shouldSoundAlarm() {
    return this.getExpiry('minutes') === 0 && this.getExpiry('seconds') === 0;
  },

  alarm(){
    if (!this.state.alarm) {
      Vibration.vibrate();
      AudioPlayer.play('crabhorn.mp3');
      if (!this.state.onBreak) {
        Alert.alert('breaktitle', alertBreakMessage, [
          {text: 'Take break', onPress: this.resetAlarm}
        ]);
      } else {
        Alert.alert('worktitle', alertWorkMessage,
          [ {text: 'Run another timeblock', onPress: this.resetAlarm},
            {text: 'Finished', onPress: this.finish}
          ]);
      }
      this.setState({alarm: true});
    }
  },

  finish() {
    this.setState({
      cycles: this.state.cycles + 0.5
    });
    this.GoToStatsPage()
  },

  resetAlarm() {
    this.setState({
      cycles: this.state.cycles + 0.5,
      alarm: false,
      onBreak: !this.state.onBreak,
      workExpiry: moment().add(this.props.worktime, 'seconds'),
      breakExpiry: moment().add(this.props.breaktime, 'seconds')
    });
  },

  getDuration: function (expiry) {
    var milliseconds = expiry.diff(moment())
    return moment.duration(milliseconds);
  },

  getTimeLeft(minOrSec, expiry) {
    var timeLeft = this.getDuration(expiry);

    if (timeLeft.asMinutes() < 0){
      return 0;
    } else if (minOrSec === 'seconds') {
      return Math.floor(timeLeft.asSeconds() % 60)
    } else {
      return Math.floor(timeLeft.asMinutes())
    }
  },

  getExpiry(minOrSec) {
    if (this.state.onBreak) {
      return this.getTimeLeft(minOrSec, this.state.breakExpiry);
    } else {
      return this.getTimeLeft(minOrSec, this.state.workExpiry);
    }
  },

  GoToStatsPage() {
    this.props.navigator.push({
      title: "Stats",
      component: StatsPage,
      passProps: {
        worktime: this.props.worktime,
        breaktime: this.props.breaktime,
        breakActivity: this.props.breakActivity,
        cycles: this.state.cycles
      }
    })
  },

  render(){
    return (
      <View>
        <Text style={styles.text}>{this.props.text}: </Text>
        <View style={[styles.wrapper,styles.buttonStyle]}>
          {this.state.onBreak && <Text style={styles.textStyle}>{this.props.breakActivity}</Text>}
          <Text style={styles.textStyle}>{this.getExpiry('minutes')} minutes </Text>
          <Text style={styles.textStyle}>{this.getExpiry('seconds')} seconds</Text>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 24,
    paddingBottom: 5
  },
  textStyle: {
    color:'white',
    fontSize: 55
  },
  wrapper: {
    padding: 10,
    marginRight:10,
    width: 350,
    backgroundColor: '#e5e5e5',
  },
  buttonStyle: {
    padding:20,
    backgroundColor: '#05B3DD',
    borderRadius: 8
  }
});

module.exports = CountDown;
