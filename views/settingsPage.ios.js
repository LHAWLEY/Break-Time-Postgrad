import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
    StyleSheet
} from 'react-native';

var store = require('react-native-simple-store'),
    Swipeout = require('react-native-swipeout')

var Settings = React.createClass ({

  componentDidMount() {
    store.get('activities').then((data) => {
      this.setState({activities: data})
    })
  },

  getInitialState() {
    return {
      activities: [],
      text: "Enter an activity here",
    };
  },

  popToTop() {
    this.props.navigator.popToTop();
  },

  saveData(value) {
    if (value !== "Enter an activity here") {
      this.state.activities.unshift(value);
      this.setState({activities: this.state.activities});
      store.save('activities', this.state.activities);
      this.refs['textInput'].setNativeProps({text: ''});
      this.setState({text: "Enter an activity here"});
    }
  },

  deleteData(index) {
    this.state.activities.splice(index, 1);
    store.save('activities', this.state.activities);
    this.setState({activities: this.state.activities});
  },

  render(){
    var that = this;
    var activities = this.state.activities.map(function(activity, i){
      {var swipeoutBtns = [
      {
        backgroundColor: '#FF5347',
        underlayColor: 'white',
        text: 'Delete',
        onPress: ()=>that.deleteData(i)
      }
    ]};
    return(
      <View key={i} style={styles.liContainer} >
        <Swipeout right={swipeoutBtns} height={50} autoClose={true}>
          <View style={styles.li}>
           <Text style={styles.liText}>{activity}</Text>
          </View>
        </Swipeout>
      </View>
    )
    });

    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          Customize Your Breaks
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            ref={'textInput'}
            style={styles.searchInput}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.state.text}/>
          <TouchableHighlight
            style={[styles.button, styles.addButton]}
            onPress={() => this.saveData(this.state.text)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.deleteText}>Swipe left to delete</Text>
        <ScrollView style={styles.wrapper} bounces={true} horizontal={false}>
          <View style={styles.activityListWrapper}>{activities}</View>
        </ScrollView>
      </View>
      )
    }
  });

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  title: {
    marginTop: 100,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  wrapper: {
    marginTop: -10,
    marginBottom: 40
  },
  flowRight: {
    flexDirection: 'row',
    padding: 20
  },
  searchInput: {
    height: 45,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
    textAlign:'left',
    backgroundColor: 'white'
  },
  button: {
    width: 45,
    height: 45,
    backgroundColor: '#05B3DD',
    borderRadius: 8.150,
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
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16
  },
  liContainer: {
    flex: 2
  },
  liText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20
  },
  deleteText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  activityListWrapper: {
    opacity: 1,
    marginTop: -50,
    backgroundColor: 'gray'
  }
})

module.exports = Settings;