import React, {
  ScrollView,
  AsyncStorage,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

var Swiper = require('react-native-swiper'),
    store = require('react-native-simple-store'),
    totalTimeWorked,
    totalBreakTime,
    activitiesAmount,
    totalCycles

var ProfilePage = React.createClass ({
  componentDidMount() {
    store.get('totalTimeWorked').then((data) => {
      totalTimeWorked = data;
    });
    store.get('totalBreakTime').then((data) => {
      totalBreakTime = data;
    });
    store.get('totalCycles').then((data) => {
      totalCycles = data;
    });
    store.get('activitiesAmount').then((data) => {
      activitiesAmount = data[0];
      this.setState({});
    });
  },

  popToTop() {
    this.props.navigator.popToTop();
  },

  render() {
    if (activitiesAmount !== undefined) {
      var activitiesNames = Object.keys(activitiesAmount)
      var activitiesList = activitiesNames.map(function(activity, i) {
        return(
          <View key={i}>
            <Text style={styles.profileText3} key={i}> {activity}: {activitiesAmount[activity]} </Text>
          </View>
        )
      })
    } else {
      var activitiesList = []
    }
   return (
    <View style={[styles.wrapper, styles.adjustFlex]}>
      <Image source={require('../imgs/desk.jpg')} style={[styles.wrapper, styles.adjustFlex, styles.backgroundImage]}>
        <ScrollView bounces={true} horizontal={false} showsVerticalScrollIndicator={false} >
          <View style={[styles.wrapper, styles.adjustFlex, styles.container]}>
            <View style={[styles.wrapper, styles.profileContainer]}>
              <Text style={[styles.profileText1, styles.profileText2]}>Timeboxing Stats</Text>
              <View style={styles.wrapper}>
                <Text style={[styles.profileText2, styles.profileText3]}>Total Time Worked:</Text>
                  <Text style={styles.profileText3}>{totalTimeWorked} minutes</Text>
                <Text style={[styles.profileText2, styles.profileText3]}>Total Break Time:</Text>
                  <Text style={styles.profileText3}>{totalBreakTime} minutes</Text>
                <Text style={[styles.profileText2, styles.profileText3]}>Total Timebox Cycles:</Text>
                  <Text style={styles.profileText3}>{totalCycles}</Text>
                <Text style={[styles.profileText2, styles.profileText3]}>Total Activities:</Text>
                  <View style={styles.wrapper}>{activitiesList}</View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Image>
    </View>
    );
  }
})

var styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center'
  },
  adjustFlex: {
    flex: 1
  },
  backgroundImage: {
    resizeMode: 'contain'
  },
  container: {
    marginTop:60
  },
  profileContainer: {
    padding:30,
    backgroundColor: 'white',
    opacity: 0.85,
    borderRadius: 8
  },
  profileText1: {
    fontSize: 32,
    marginBottom: 15
  },
  profileText2: {
    fontWeight: 'bold'
  },
  profileText3: {
    fontSize: 25,
    paddingTop: 10
  }
});

module.exports = ProfilePage;
