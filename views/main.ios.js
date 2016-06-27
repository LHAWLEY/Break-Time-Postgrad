import React, {
  Alert,
  AsyncStorage,
  AppRegistry,
  Animated,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
  NavigatorIOS,
  ScrollView,
} from 'react-native';

var setTimeBlockPage = require('./timeBlock.ios'),
    settingsPage = require('./settingsPage.ios'),
    Swiper = require('react-native-swiper'),
    statsPage = require('./profilePage.ios'),
    store = require('react-native-simple-store')
// Uncomment to re-set stats

// store.delete('activitiesAmount')
// store.delete('totalTimeWorked')
// store.delete('totalBreakTime')
// store.delete('totalCycles')
// store.delete('activities')


class Main extends Component {

  constructor() {
    super();
      this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

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

  }

  GoToSetTimeBlock() {
    this.props.navigator.push({
      title: 'Set Time Block',
      component: setTimeBlockPage
    })
  }

	GoToSettings() {
		this.props.navigator.push({
			title: 'Settings',
			component: settingsPage
		})
	}

  GoToStats() {
    this.props.navigator.push({
      title: 'Statistics',
      component: statsPage
    })
  }

  render() {
    return (
      <Animated.View style={styles.container}>
        <View>
          <Swiper height={225} horizontal={true} autoplay={true} showsPagination={true}>
            <Image source={require('../imgs/BreakTime.jpeg')} style={styles.backgroundImage} >
              <Text style={styles.mainTitle}>Break Time</Text>
            </Image>

            <Image source={require('../imgs/bikeride.jpeg')} style={styles.backgroundImage} >
              <Text style={styles.whiteText}>Take better breaks.</Text>
            </Image>

            <Image source={require('../imgs/productivity.jpg')} style={styles.backgroundImage} >
              <Text style={styles.whiteText}>Increase productivity.</Text>
            </Image>
          </Swiper>
        </View>
          <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#9BE8FF'}
            onPress={() => this.GoToSetTimeBlock()}>
            <Text style={styles.buttonText}>Set Time Block</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            underlayColor={'#9BE8FF'}
            onPress={() => this.GoToStats()}>
            <Text style={styles.buttonText}>Timeboxing Stats</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            underlayColor={'#9BE8FF'}
            onPress={() => this.GoToSettings()}>
            <Text style={styles.buttonText}>Activity Settings</Text>
          </TouchableHighlight>
          </View>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  backgroundImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  mainTitle: {
    fontSize: 30,
    textAlign: 'center',
    margin: 15,
    fontWeight: 'bold',
  },
  whiteText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
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
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});

module.exports = Main;
