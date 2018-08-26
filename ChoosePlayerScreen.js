import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  FlatList,
  AppState
} from 'react-native';

type Props = {};
export default class ChoosePlayerScreen extends Component<Props> {
  static navigationOptions = {
      title: 'Choose Player Mode',
    };
  render() {
    return (
      <View styles={styles.container}>
        <Text>One Player</Text>
        <TouchableHighlight underlayColor="white"
        onPress={() => {this.props.navigation.navigate('Game')}}>
          <Text style={styles.buttonText}>One Player</Text>
        </TouchableHighlight>

        <Text>Two Player</Text>
        <TouchableHighlight underlayColor="white"
        onPress={() => {this.props.navigation.navigate('Game')}}>
          <Text style={styles.buttonText}>Two Player</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center'
  },
  button: {
    marginTop: 120,
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  header: {
    color: 'black',
    marginTop: 160,
    padding:  0,
    fontWeight: 'bold',
    fontSize: 50
  }
})
