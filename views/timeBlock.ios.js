import React, {
  Picker,
  ScrollView,
  View,
  Animated,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

var store = require('react-native-simple-store'),
    Swiper = require('react-native-swiper'),
    TimerLogicPage = require('./timerlogic.ios'),
    ScrollableTabView = require('react-native-scrollable-tab-view'),
    activitiesList = [],
    activityData

var TimeBlock = React.createClass({

  componentDidMount() {
    store.get('activities').then((data) => {
      this.setState({activities: data, breakActivity: data[0]});
      activityData = data;
    });
  },

  GoToTimerPage() {
    this.props.navigator.push({
      title: "Timer",
      component: require('./timer.ios'),
      passProps: {
        worktime: parseInt(this.state.worktime),
        breaktime: parseInt(this.state.breaktime),
        breakActivity: this.state.breakActivity
      }
    })
  },

  getInitialState() {
    return {
      // NORMAL TIMES
      worktime: '15',
      breaktime: '5',
      activities: activityData,
      index: 0
    };
  },

  updateWorktime(time) {
    this.setState({
      worktime: time,
      index: 0
    });
  },

  updateBreaktime(time) {
    this.setState({
      breaktime: time,
      index: 1
    });
  },

  updateBreakActivity(activity) {
    this.setState({
      breakActivity: activity,
      index: 2
    })
  },

  render() {
    if (this.state.activities !== undefined) {
      activitiesList = this.state.activities.map(function(activity, i) {
        return(
          <Picker.Item key={i} label={activity} value={activity} />
        )
      })
    } else {
      activitiesList = []
    }
    return (

    <ScrollView bounces={true} horizontal={false}>
      <View style={styles.container}>
        <Swiper height={275} horizontal={true} autoplay={true} showsPagination={true}>
            <Image source={require('../imgs/wide-workstation.jpg')} style={styles.backgroundImage} >
              <Text style={styles.whiteText}>work.</Text>
            </Image>

            <Image source={require('../imgs/run.jpeg')} style={styles.backgroundImage} >
              <Text style={styles.whiteText}>run.</Text>
            </Image>

            <Image source={require('../imgs/yoga.jpg')} style={styles.backgroundImage} >
              <Text style={styles.whiteText}>do yoga.</Text>
            </Image>

            <Image source={require('../imgs/music.jpg')} style={styles.backgroundImage} >
              <Text style={styles.whiteText}>play music.</Text>
            </Image>

            <Image source={require('../imgs/snackbreak.jpg')} style={styles.backgroundImage} >
              <Text style={styles.whiteText}>eat snacks.</Text>
            </Image>
        </Swiper>
      </View>

      <View style={styles.container}>
        <Swiper showsButtons={true} height={300} horizontal={true} index={this.state.index} loop={false}>
          <View style={styles.container}>
            <Text style={styles.description}>1. Set Work Time Block</Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.worktime}
              onValueChange={this.updateWorktime}>
              <Picker.Item label='15 Minutes' value='15' />
              <Picker.Item label='25 Minutes' value='25' />
              <Picker.Item label='30 Minutes' value='30' />
              <Picker.Item label='45 Minutes' value='45' />
              <Picker.Item label='60 Minutes' value='60' />
            </Picker>
          </View>
          <View style={styles.container}>
            <Text style={styles.description}>2. Set Break Time Block</Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.breaktime}
              onValueChange={this.updateBreaktime}>
              <Picker.Item label='5 Minutes' value='5' />
              <Picker.Item label='10 Minutes' value='10' />
              <Picker.Item label='15 Minutes' value='15' />
              <Picker.Item label='20 Minutes' value='20' />
            </Picker>
          </View>
          <View style={styles.container}>
            <Text style={styles.description}>3. Choose a break activity</Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.breakActivity}
              onValueChange={this.updateBreakActivity}>
              {activitiesList}
            </Picker>
          </View>

          <View style={styles.container}>
            <Text style={[styles.description, styles.startDescription]}>4. Start your timebox cycle</Text>
            <TouchableHighlight
              style={styles.button}
              underlayColor='#9BE8FF'
              onPress={() => this.GoToTimerPage()}>
              <Text style={styles.buttonText}>
                Start
              </Text>
            </TouchableHighlight>
          </View>
        </Swiper>
      </View>
    </ScrollView>
    );
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  description: {
    textAlign: 'center',
    fontSize: 25
  },
  startDescription: {
    position: 'absolute',
    top: 27,
    paddingLeft: 40
  },
  button: {
    backgroundColor: '#05B3DD',
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
    color: 'white'
  },
  picker: {
    width: 300
  },
  backgroundImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  whiteText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  }
});

module.exports = TimeBlock;
