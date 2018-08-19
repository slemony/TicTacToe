import {
  createStackNavigator,
} from 'react-navigation';

import BeginScreen from './BeginScreen';
import ChoosePlayerScreen from './ChoosePlayerScreen';
import GameScreen from './GameScreen';

export default createStackNavigator({
  Begin: {
    screen: BeginScreen,
  },
  ChoosePlayer: {
    screen: ChoosePlayerScreen,
  },
  Game: {
    screen: GameScreen,
  },
}, {
  initialRouteName: 'Begin',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#a80000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});
