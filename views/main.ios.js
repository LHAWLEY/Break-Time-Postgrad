import React, {
  Animated,
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

var Swiper = require('react-native-swiper'),
    store = require('react-native-simple-store')
// Uncomment to re-set stats

// store.delete('activitiesAmount')
// store.delete('totalTimeWorked')
// store.delete('totalBreakTime')
// store.delete('totalCycles')
// store.delete('activities')


var Main = React.createClass ({

  componentDidMount() {
    // Async Storage
    store.get('activities').then((data) => {
      if (data !== null){
        this.setState({activities: data})
      } else {
        this.setState({activities: ["Go for a walk", "Go for a run", "Sashay away", "Have a snack", "Play music"]});
        store.save('activities', ["Go for a walk", "Go for a run", "Sashay away", "Have a snack", "Play music"])
      }
    });
    store.get('totalTimeWorked').then((data) => {
      if (data === null){
        store.save('totalTimeWorked', 0)
      }
    });
    store.get('totalBreakTime').then((data) => {
      if (data === null){
        store.save('totalBreakTime', 0)
      }
    });
    store.get('activitiesAmount').then((data) => {
      if (data === null || Object.keys(data).length === 0){
        store.save('activitiesAmount', [{}] )
      }
    });
    store.get('totalCycles').then((data) => {
      if (data === null){
        store.save('totalCycles', 0)
      }
    });
  },

  GoToSetTimeBlock() {
    this.props.navigator.push({
      title: 'Set Time Block',
      component: require('./timeBlock.ios')
    })
  },

	GoToSettings() {
		this.props.navigator.push({
			title: 'Settings',
			component: require('./settingsPage.ios')
		})
	},

  GoToStats() {
    this.props.navigator.push({
      title: 'Statistics',
      component: require('./profilePage.ios')
    })
  },

  render() {
    return (
      <Animated.View style={styles.container}>
        <View>
          <Swiper height={225} horizontal={true} autoplay={true} showsPagination={true}>
            <Image source={require('../imgs/BreakTime.jpeg')} style={styles.backgroundImage} >
              <Text style={[styles.alignBold, styles.mainTitle]}>Break Time</Text>
            </Image>

            <Image source={require('../imgs/bikeride.jpeg')} style={styles.backgroundImage} >
              <Text style={[styles.alignBold, styles.whiteText]}>Take better breaks.</Text>
            </Image>

            <Image source={require('../imgs/productivity.jpg')} style={styles.backgroundImage} >
              <Text style={[styles.alignBold, styles.whiteText]}>Increase productivity.</Text>
            </Image>
          </Swiper>
        </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.GoToSetTimeBlock()}>
              <Text style={[styles.alignBold, styles.buttonText]}>Set Time Block</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              onPress={() => this.GoToStats()}>
              <Text style={[styles.alignBold, styles.buttonText]}>Timeboxing Stats</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              onPress={() => this.GoToSettings()}>
              <Text style={[styles.alignBold, styles.buttonText]}>Activity Settings</Text>
            </TouchableHighlight>
          </View>
      </Animated.View>
    );
  }
})

var styles = StyleSheet.create({
  alignBold: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },
  backgroundImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  whiteText: {
    color: 'white'
  },
  buttonContainer: {
    marginBottom: 25,
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
    margin: 10,
    fontSize: 20,
    color: 'white'
  }
});

module.exports = Main;
