// @flow
import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Colors } from '../../Theme';
import type { TextStyle } from '../../Common/RNPropTypes';

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontSize: 17,
    lineHeight: 21,
    ...Platform.select({
      ios: {
        marginBottom: 4.5,
        marginTop: 9.5,
      },
      android: {
        textAlignVertical: 'center',
      },
    }),
  },
  darkThemeTitle: {
    color: Colors.white,
  },
});

type TitleWrapperType = {
  title?: string,
  titleStyle?: TextStyle,
  darkTheme?: boolean,
};

const TitleWrapper = ({
  title,
  titleStyle,
  darkTheme,
}: TitleWrapperType) => (
  <View style={styles.titleWrapper}>
    <Text
      numberOfLines={1}
      style={[styles.title, darkTheme && styles.darkThemeTitle, titleStyle]}
    >
      {title}
    </Text>
  </View>
);

export default TitleWrapper;
