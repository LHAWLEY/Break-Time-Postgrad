import React, {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

var profilePage = require('./profilePage.ios'),
    mainPage = require('./main.ios'),
    store = require('react-native-simple-store'),
    timeworked,
    breakedtime

var Stats = React.createClass({

  componentDidMount(){

    store.get('totalTimeWorked').then((data) => {
      var newTotal = data += Math.floor((this.props.worktime * this.props.cycles))
      store.save('totalTimeWorked', newTotal)
    });
    store.get('totalBreakTime').then((data) => {
      var newTotal = data += Math.floor((this.props.breaktime * this.props.cycles))
      store.save('totalBreakTime', newTotal)
    });
    store.get('activitiesAmount').then((data) => {
      var activities = data[0]
      var activityNames = Object.keys(activities);
      if (activityNames.includes(that.props.breakActivity)){
        activities[that.props.breakActivity]++
      }else {
        activities[that.props.breakActivity] = 1
      }
      store.save('activitiesAmount', [activities])
    });
    store.get('totalCycles').then((data) => {
      var newTotal = data += this.props.cycles
      store.save('totalCycles', newTotal)
    })
  },

  GoToProfile() {
    this.props.navigator.push({
      title: 'Profile',
      component: profilePage
    })
  },

  GoToMain() {
    this.props.navigator.popToTop()
  },

  // timeworked = Math.floor((this.props.worktime * this.props.cycles));
  // breakedtime = Math.floor((this.props.breaktime * this.props.cycles));
  render(){
    return(
    <View style={styles.statsBackground}>
    <Image source={require('../imgs/workstation.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={[styles.wrapper,styles.statsContainer]}>
          <Text style={styles.statText1}>Finished!</Text>
          <Text style={styles.statText}>You had {this.props.cycles} timebox cycles</Text>
          <Text style={styles.statText}>You worked for {this.timeworked} minutes!</Text>
          <Text style={styles.statText}>You breaked for {this.breakedtime} minutes!</Text>
          <Text style={styles.statText}>Your break activity was:</Text>
          <Text style={styles.statText}>{this.props.breakActivity}</Text>
        </View>



        <View>
          <TouchableHighlight
            onPress={() => this.GoToMain()}
            style={styles.button}
            underlayColor='#9BE8FF'>
            <Text style={styles.buttonText}>Main Page</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Image>
    </View>
    )
  }
})

var styles = StyleSheet.create({
   statsBackground: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    marginTop:60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    padding: 10,
    marginRight:10,
    width: 350,
    backgroundColor: '#e5e5e5',
    },
  statsContainer: {
    padding:20,
    backgroundColor: 'white',
    opacity: 0.85,
    borderRadius: 8,
    alignItems: 'center',
  },
  statText1: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statText: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 7,
  },
  // button: {
  //   backgroundColor: '#05B3DD',
  //   margin: 15,
  //   borderRadius: 8.150,
  //   width: 300,
  //   height: 45,
  //   shadowColor: 'black',
  //   shadowOpacity: 0.3,
  //   shadowOffset: {width: 0, height: 3},
  //   shadowRadius: 2
  // },
  buttonText: {
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});

module.exports = Stats;
