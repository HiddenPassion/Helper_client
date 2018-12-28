// @flow
import React from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    width: '80%',
    position: 'relative',
  },
  invalidLabel: {
    fontSize: 16,
    paddingLeft: 3,
    position: 'absolute',
    top: 45, // depends on height of inputContainer
    left: 7,
    color: Colors.red,
  },
  inputFieldContainer: {
    marginTop: 10,
  },
  inputField: {
    borderRadius: 15,
    backgroundColor: Colors.palePrim,
    padding: 9,
    paddingTop: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  hidden: {
    display: 'none',
  },
});

// eslint-disable-next-line
type Props = {
  errorMessage: string,
  inputRef: Object,
  placeholder: string,
  props: Object,
};

const Input = ({
  errorMessage, inputRef, placeholder, ...props
}: Props) => (
  <View style={styles.container}>
    <View style={styles.inputFieldContainer}>
      <TextInput
        {...props}
        placeholder={placeholder && placeholder[0].toUpperCase() + placeholder.slice(1)}
        style={styles.inputField}
        ref={inputRef}
      />
    </View>
    <Text style={[errorMessage ? styles.invalidLabel : styles.hidden]}>{errorMessage}</Text>
  </View>
);

export default Input;
