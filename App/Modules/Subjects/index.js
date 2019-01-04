// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { compose } from 'recompose';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.red,
    height: 150,
    width: 350,
    alignSelf: 'center',
  },
});

const Subjects = () => (
  <View style={styles.container} />
);

const enhancer = compose();

export default enhancer(Subjects);
