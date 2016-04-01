import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

class Main extends Component {
	render() {
    return (
			<View style={styles.container}>
			  <Text style={styles.mainTitle}>
			    Break Time
			  </Text>
			  <View style={styles.buttonsContainer}>
			    <TouchableHighlight style={styles.button} underlayColor={'red'} onPress={() => this.setState({toggle: !this.state.toggled})}>
			      <Text style={styles.buttonText}>
			        Set Time Block
			      </Text>
			    </TouchableHighlight>

			    <TouchableHighlight style={styles.button} underlayColor={'red'} onPress={() => this.setState({toggle: !this.state.toggled})}>
			      <Text style={styles.buttonText}>
			        View Profile
			      </Text>
			    </TouchableHighlight>
			  </View>
			</View>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
  },
  buttonsContainer: {

  },
  buttonText: {
    textAlign: 'center',
    margin: 15
  },
  button: {
    backgroundColor: 'green',
    margin: 15,
    borderRadius: 8.150,
    width: 300,
    height: 45,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Main;