// @flow
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  screenWidth: width,
  screenHeight: height,
  ...Platform.select({
    android: {
      navigationHeaderHeight: 49,
      statusBarHeight: 0,
    },
  }),
};
