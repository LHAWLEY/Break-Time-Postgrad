import React, {
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

var LandingPage = React.createClass({

	GoToMain() {
		this.props.navigator.resetTo({
      title: 'Main',
      component: require('./main.ios')
    })
	},

  render() {
    return (
  		<TouchableWithoutFeedback onPress={() => this.GoToMain()}>
  			<View style={[styles.reset, styles.container]}>
      		<Image source={require('../imgs/clock.png')} style={[styles.reset, styles.landing]}></Image>
      		<Text style={styles.text}>Break Time</Text>
      	</View>
    	</TouchableWithoutFeedback>
    );
  }
})

var styles = StyleSheet.create({
  reset: {
    flex: 1,
    backgroundColor: '#05B3DD'
  },
	container: {
		alignItems: 'center'
	},
  landing: {
  	width: 150,
  	height: 150,
    marginTop: 200,
    resizeMode: 'contain'
  },
  text: {
  	marginBottom: 250,
  	fontSize: 60,
  	fontWeight: 'bold',
  	backgroundColor: 'transparent',
  	color: 'white'
  }
})

module.exports = LandingPage;