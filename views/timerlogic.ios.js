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

var alertBreakMessage = 'Now take a well deserved break.',
    alertWorkMessage = 'Want to start another timeblock?',
    alertMessage = 'Confirm exit';

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


  GoToMainPage() {
    this.stopTimer()
    this.props.navigator.popToTop()
  },

  GoToStatsPage() {
    this.props.navigator.push({
      title: "Stats",
      component: StatsPage,
      navigationBarHidden: true,
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
  },
  setNewBlockCycle() {

    // TESTING TIMES

    //  var workMin = 5,
    //     breakMin = 3;

    // this.setState({
    //   workMin: workMin,
    //   breakMin: breakMin,
    //   workExpiry: moment().add(workMin, 'seconds')
    // })

    // NORMAL CODE

    var workMin = this.props.workTime,
        breakMin = this.props.breakTime;

    this.setState({
      workMin: workMin,
      breakMin: breakMin,
      workExpiry: moment().add(workMin, 'minutes')
    })

    this.startTimer()

    console.log('wexp2:' + this.state.workExpiry.format())
    console.log('bexp2:' + this.state.breakExpiry.format())
    this.checkTimer();
  },

  checkTimer() {
    console.log('wexp1:' + this.state.workExpiry.format())
    console.log('bexp1:' + this.state.breakExpiry.format())
    switch (onBreak) {
      case true:
        if (moment().format() >= this.state.breakExpiry.format()) {
          this.stopTimer();
          onBreak = false;
          Vibration.vibrate();
          AudioPlayer.play('crabhorn.mp3');
          Alert.alert(
            'You look so refreshed!',
            alertWorkMessage,
            [
              {text: 'Run another timeblock', onPress: () => this.setNewBlockCycle()},
              {text: 'Finished', onPress: () => this.finished()}
            ]
          );
        } else {
          this.forceUpdate();
        }
        break;
      case false:
        if (moment().format() >= this.state.workExpiry.format()) {
          this.state.cycles++;
          onBreak = true;
          Vibration.vibrate();
          AudioPlayer.play('crabhorn.mp3');
          this.stopTimer()
          Alert.alert(
            'Great job staying on task!',
            alertBreakMessage,
            [
              {text: 'Take Break', onPress: () => this.setBreak()}
            ]
          );
        } else {
          this.forceUpdate();
        }
        break;
    }
  },
  finished(){
    var workMin = 1,
        breakMin = 1;

    this.setState({
      workExpiry: moment().add(workMin, 'seconds'),
      breakExpiry: moment().add(breakMin, 'seconds')
    })
    this.GoToStatsPage();
  },
  setBreak(){

    this.setState({
      // TESTING
      // breakExpiry: moment().add(this.state.breakMin, 'seconds')
      // NORMAL
      breakExpiry: moment().add(this.state.breakMin, 'minutes')
    }),
    this.startTimer(),
    this.checkTimer()
  },
  componentDidMount() {

    // TESTING TIMES
    // var workMin = 5,
    //     breakMin = 3;

    // // NORMAL TIMES
    var workMin = this.props.workTime,
        breakMin = this.props.breakTime;

    this.setState({
      workMin: workMin,
      breakMin: breakMin,
      // TESTING
      // workExpiry: moment().add(workMin, 'seconds')
      // NORMAL
      workExpiry: moment().add(workMin, 'minutes')
    })

    this.startTimer();
  },
  _update(){
    this.checkTimer();
  },
  startTimer(){
    timeOn = setInterval(this._update, 1000);
  },
  stopTimer(){
    clearInterval(timeOn);
  },
  componentWillUnmount() {
    this.stopTimer();
    onBreak = false;
  },
  getTimeLeft: function(expiry) {
    var milliseconds = expiry.diff(moment())
    return moment.duration(milliseconds);
  },
  getTimeToWorkExpiry: function() {
    return this.getTimeLeft(this.state.workExpiry);
  },
  getTimeToBreakExpiry: function() {
    return this.getTimeLeft(this.state.breakExpiry);
  },
  renderStop() {
    return (
      <View style={styles.stopContainer}>
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
  },
});

var styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 24,
    paddingBottom: 5
  },
  textStyle: {
    color:'black',
    fontSize: 55
  },
   textStyle2: {
    color:'black',
    fontSize: 18,
  },
  wrapper: {
    padding: 10,
    width: 350,
    backgroundColor: '#e5e5e5',
  },
  buttonStyle: {
    padding:20,
    backgroundColor: 'white',
    opacity: 0.85,
    borderRadius: 8
  },
  button: {
    backgroundColor: '#05B3DD',
    margin: 15,
    borderRadius: 8.150,
    width: 300,
    height: 45,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 2
  },
  buttonText: {
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  stopContainer: {
    marginLeft: 10,
  },
});

module.exports = CountDown;
