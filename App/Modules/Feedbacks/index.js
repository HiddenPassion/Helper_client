// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { compose } from 'recompose';
import { Colors } from '../../Theme';
import AppScreen from '../../Components/AppScreen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.red,
    height: 150,
    width: 350,
    alignSelf: 'center',
  },
});

const Feedbacks = () => (
  <AppScreen
    title="Feedbacks"
  >
    <View>
      <View style={[styles.container, { backgroundColor: 'blue'}]} />
      <View style={[styles.container, { backgroundColor: 'white'}]} />
      <View style={[styles.container, { backgroundColor: 'green'}]} />
      <View style={[styles.container, { backgroundColor: 'grey'}]} />
      <View style={[styles.container, { backgroundColor: 'yellow'}]} />
      <View style={[styles.container, { backgroundColor: 'pink'}]} />
      <View style={[styles.container, { backgroundColor: 'black'}]} />
      <View style={[styles.container, { backgroundColor: 'red'}]} />
    </View>
  </AppScreen>
);

const enhancer = compose();

export default enhancer(Feedbacks);
