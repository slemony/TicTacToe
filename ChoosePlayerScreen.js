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
      <View style={styles.container}>

        <View style={styles.buttonsty}>
          <TouchableHighlight underlayColor="white"
          onPress={() => {this.props.navigation.navigate('Game')}}>
            <View style={styles.button}>
            <Text style={styles.buttonText}>One Player</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonsty}>
          <TouchableHighlight underlayColor="white"
          onPress={() => {this.props.navigation.navigate('Game')}}>
            <View style={styles.button}>
            <Text style={styles.buttonText}>Two Player</Text>
            </View>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  buttonsty: {
    marginTop: 20,
    width: 350,
    backgroundColor: '#2196F3'
  },
  button:{
    marginTop: 95,
    marginBottom: 95,
    alignItems: 'center',
  },
  buttonText: {
    padding: 20,
    fontSize: 30,
    color: 'white'
  }
})
