// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose } from 'recompose';
import ActiveOpacity from '../ActiveOpacity';
import type { ViewStyle, TextStyle } from '../../Common/RNPropTypes';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
  },
});

type ButtonType = {
  disabled?: boolean,
  buttonStyle?: ViewStyle,
  labelStyle?: TextStyle,
  label: string,
  onPress: Function,
};

const Button = ({
  disabled, onPress, buttonStyle, labelStyle, label,
}: ButtonType) => (
  <ActiveOpacity disabled={disabled} onPress={onPress}>
    <View style={[styles.container, buttonStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  </ActiveOpacity>
);

const enhancer = compose();

export default enhancer(Button);
