// @flow

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
