// @flow

import { Colors } from '../../Theme';

export const screen = (name: string, options: Object = {}) => {
  const { navigatorStyle, ...rest } = options;
  return ({
    screen: name,
    navigatorStyle: {
      navBarHidden: true,
      drawUnderNavBar: true,
      drawUnderStatusBar: true,
      statusBarColor: Colors.statusBarColor,
      statusBarTextColorScheme: 'dark',
      ...navigatorStyle,
    },
    ...rest,
  });
};
