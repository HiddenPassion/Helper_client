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
  Promise.all([Icon.getImageSource('md-clipboard', 30), Icon.getImageSource('ios-people', 30)]).then(
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
            screen: 'helper.Lecturer',
            title: 'Lecturers',
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
