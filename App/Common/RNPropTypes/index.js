// @flow
import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type NavigatorPropsType = {
  pop: Function,
  push: Function,
  popToRoot: Function,
  resetTo: Function,
  dismiss: Function,
  addOnNavigatorEvent: Function,
  _removeOnNavigatorEvent: Function,
  setStyle: Function,
}

export type {
  NavigatorPropsType,
  ViewStyle,
  TextStyle,
  ImageStyle,
};
