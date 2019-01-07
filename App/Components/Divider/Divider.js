// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../Theme';
import type { ViewStyle } from '../../Common/RNPropTypes';

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.silver,
  },
});

type DividerProps = {
  style?: ViewStyle,
};

const Divider = ({ style }: DividerProps) => (
  <View style={[styles.divider, style]} />
);

export default Divider;
