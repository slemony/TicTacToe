import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from 'react-native';
import circle_outline from './images/circle_outline.png';
import cross from './images/cross.png';

type Props = {};
export default class GameScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    }
  }

  ComponentDidMount() {
    this.initializeGame();
  }

  renderImage = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value) {
      case 1: return <Image style={styles.image} source={circle_outline}/>;
      case -1: return <Image style={styles.image} source={cross}/>;
      default: return <View />;
    }
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  }

  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    // Check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    // Check columns
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    //Check diagonal
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    return 0;
  }

  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value != 0) { return; }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 is the winner");
      this.initializeGame();
    }
    else if (winner == -1) {
      Alert.alert("Player 2 is the winner");
      this.initializeGame();
    }
  }

  onNewGamePress = () => {
    Alert.alert("The game is reset. ");
    this.initializeGame();
  }

  showTurn = () => {//Players turn
    var value = this.state.gameState[row][col];
    switch(value) {
      //case 1: return this.state = {player: "Player One"};
      case -1: return this.state = {player: "Player Two"};
      default: return this.state = {player: "Player One"};
  }

  render() {
    return (
      <View style={styles.container}>

      <Text style={styles.turn}>{this.state.player} Turn</Text>//show turn

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

          <TouchableOpacity style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]} onPress={() => this.onTilePress(0, 0)}>
            {this.renderImage(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, {borderTopWidth: 0}]} onPress={() => this.onTilePress(0, 1)}>
            {this.renderImage(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0}]} onPress={() => this.onTilePress(0, 2)}>
            {this.renderImage(0, 2)}
          </TouchableOpacity>

        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

          <TouchableOpacity style={[styles.tile, {borderLeftWidth: 0}]} onPress={() => this.onTilePress(1, 0)}>
            {this.renderImage(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity style={styles.tile} onPress={() => this.onTilePress(1, 1)}>
            {this.renderImage(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, {borderRightWidth: 0}]} onPress={() => this.onTilePress(1, 2)}>
            {this.renderImage(1, 2)}
          </TouchableOpacity>

        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

          <TouchableOpacity style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]} onPress={() => this.onTilePress(2, 0)}>
            {this.renderImage(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, {borderBottomWidth: 0}]} onPress={() => this.onTilePress(2, 1)}>
            {this.renderImage(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]} onPress={() => this.onTilePress(2, 2)}>
            {this.renderImage(2, 2)}
          </TouchableOpacity>

        </View>

        <View style={{paddingBottom: 40}} />

        <Button title="New Game" onPress={() => this.onNewGamePress()} />

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
//players trun text
  turn: {
   color: 'black',
   paddingBottom: 50,
   fontSize: 25
  },

  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 92,
    height: 92,
  },
});
