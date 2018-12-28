// @flow
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import registerScreens from './App/Navigation';
import createStore from './App/Store/createStore';

const store = createStore();
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'helper.Login',
    navigatorStyle: {
      navBarHidden: true,
      drawUnderNavBar: true,
      drawUnderStatusBar: true,
      statusBarTextColorSchema: 'light',
      statusBarColor: 'transparent',
    },
  },
  animationType: 'fade',
});
