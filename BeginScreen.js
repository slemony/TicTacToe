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

export default class BeginScreen extends Component<Props> {

  render() {

    return (
      <View style={styles.container}>
      <Text style={styles.header}>TIC TAC TOE</Text>
      <Text style={styles.sub}>The simplist game on the world</Text>
      <View style={styles.button}>
      <TouchableHighlight underlayColor="white"
      onPress={() => {this.props.navigation.navigate('ChoosePlayer')}}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableHighlight>
      </View>




      </View>

    );

  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
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
  },
  sub: {
    marginTop: 20
  }
})
