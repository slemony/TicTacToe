import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import {
  InputWithLabel,
  PickerWithLabel,
  AppButton,
} from './UI';
import { FloatingAction } from 'react-native-floating-action';

const actions = [{
  text: 'Delete',
  color: '#c80000',
  icon: require('./images/baseline_delete_white_18dp.png'),
  name: 'delete',
  position: 2
},{
  text: 'Add',
  color: '#c80000',
  icon: require('./images/baseline_add_white_18dp.png'),
  name: 'add',
  position: 1
}];

let config = require('./Config');

type Props = {};
export default class IndexScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Players',
  };
  constructor(props) {
    super(props)

    this.state = {
      players: [],
      readyPlayers: [],
      gameMode: 2,
      isFetching: false,
      isModalVisible : false,
    };
    //if(this.state.gameMode==2){Alert.alert('Select Player 1');}
    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
    this.setState({
      gameMode: this.props.navigation.getParam('gameMode'),
    });
  }

  _load() {
    let url = config.settings.serverPath + '/api/players';

    this.setState({isFetching: true});

    fetch(url)
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }

      return response.json()
    })
    .then((players) => {
      this.setState({players});
      this.setState({isFetching: false});
    })
    .catch((error) => {
      console.log(error)
    });
  }

  showStartButton()
  {
       if(this.state.isModalVisible==false){
          this.setState({isModalVisible:true});
       }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.players}
          showsVerticalScrollIndicator={true}
          refreshing={this.state.isFetching}
          onRefresh={this._load}
          renderItem={({item}) =>
            <TouchableHighlight
              underlayColor={'#cccccc'}
              onPress={(readyPlayers) => {
                if(this.state.gameMode==1){
                  this.props.navigation.navigate('Game', {
                  id: item.id,
                  headerTitle: item.name,
                  refresh: this._load,
                  gameMode: this.state.gameMode,
                })
                console.log(item.name);
                }
                else if(this.state.gameMode==2){
                  if(this.state.readyPlayers.length!=2)  {
                    this.setState({readyPlayers:this.state.readyPlayers.concat([item])});
                  }
                  console.log(this.state.readyPlayers);

                  if(this.state.readyPlayers.length==0){
                    Alert.alert('select player 2');
                  }
                }
                if(this.state.gameMode==2 && this.state.readyPlayers.length==1){
                  this.showStartButton()
                  console.log(this.state.readyPlayers);
                }
              }}
            >
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>Win Record:{item.winRecord}</Text>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={(item) => {item.id.toString()}}
        />
        {(this.state.isModalVisible) && <AppButton style={styles.button}
          title={'Start Game'}
          theme={'primary'}
          onPress={(readyPlayers) => {
             if(this.state.gameMode==2 && this.state.readyPlayers.length==2){
                this.props.navigation.navigate('Game', {
                refresh: this._load,
                gameMode: this.state.gameMode})
             console.log(this.state.readyPlayers);
            }
          }}
        />}
        <FloatingAction
          actions={actions}
          color={'#a80000'}
          floatingIcon={(
            <Image
              source={require('./images/baseline_edit_white_18dp.png')}
            />
          )}
          onPressItem={(name) => {
              switch(name) {
                case 'add':
                  this.props.navigation.navigate('CreatePlayer', {
                    refresh: this._load,
                    indexRefresh: this.props.navigation.getParam('refresh'),
                  });
                  break;

                case 'delete':
                  this._delete();
                  break;
              }
            }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },

  item: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },

  itemSubtitle: {
    fontSize: 18,
  },

  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});
