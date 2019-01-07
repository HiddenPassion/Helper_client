/* @flow */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import ActiveOpacity from '../../ActiveOpacity';
import { Colors } from '../../../Theme';
import { type TextStyle } from '../../../Common/RNPropTypes';


const styles = StyleSheet.create({
  icon: {
    fontSize: 28,
    color: Colors.blueCore,
  },
  touchTarget: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type BackButtonType = {
  onPress: Function,
  style?: TextStyle,
};

const BackButton = ({ onPress, style }: BackButtonType) => (
  <ActiveOpacity
    onPress={onPress}
    style={styles.touchTarget}
  >
    <Icon style={[styles.icon, style]} name="md-arrow-back" />
  </ActiveOpacity>
);

export default BackButton;
