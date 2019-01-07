// @flow
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../Theme';

export const defaultNavigatorStyle = {
  navBarHidden: true,
  drawUnderNavBar: true,
  drawUnderStatusBar: true,
  statusBarColor: Colors.statusBarColor,
  statusBarTextColorScheme: 'dark',
};

export const screen = (name: string, options: Object = {}) => {
  const { navigatorStyle, ...rest } = options;
  return ({
    screen: name,
    navigatorStyle: {
      ...defaultNavigatorStyle,
      ...navigatorStyle,
    },
    ...rest,
  });
};

export const startTabBaseApp = () => {
  Promise.all([Icon.getImageSource('md-map', 30), Icon.getImageSource('md-share-alt', 30)]).then(
    (sources) => {
      Navigation.startTabBasedApp({
        tabs: [
          {
            screen: 'helper.Subjects',
            title: 'Subjects',
            icon: sources[0],
            navigatorStyle: {
              ...defaultNavigatorStyle,
            },
          },
          {
            screen: 'helper.Feedbacks',
            title: 'Feedback',
            icon: sources[1],
            navigatorStyle: {
              ...defaultNavigatorStyle,
            },
          },
        ],
      });
    },
  );
};
