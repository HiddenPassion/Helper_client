// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActiveOpacity from '../../ActiveOpacity';
import { Colors } from '../../../Theme';
import { type TextStyle } from '../../../Common/RNPropTypes';

const styles = StyleSheet.create({
  icon: {
    color: Colors.blueCore,
    fontSize: 28,
  },
  touchTarget: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type AddButtonProps = {
  onPress: Function,
  style?: TextStyle,
};

const AddButton = ({ onPress, style }: AddButtonProps) => (
  <ActiveOpacity
    style={styles.touchTarget}
    onPress={onPress}
  >
    <Icon style={[styles.icon, style]} name="md-add" />
  </ActiveOpacity>
);

export default AddButton;
