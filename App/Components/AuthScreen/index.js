// @flow
import React, { type Node } from 'react';
import {
  View, Text, ScrollView, KeyboardAvoidingView, StyleSheet,
} from 'react-native';
import ActiveOpacity from '../ActiveOpacity';
import { Styles, Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.springBug,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    // marginTop: Metrics.navigationHeaderHeight,
  },
  form: {
    width: '80%',
    marginVertical: 40,
    backgroundColor: Colors.bermuda,
    borderWidth: 1,
    borderColor: Colors.red,
    paddingBottom: 20,
    paddingVertical: 10,
    borderRadius: 4,
    maxWidth: 575,
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: 'center',
    width: '80%',
  },
  button: {
    width: '100%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  linkButton: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 6,
  },
  logo: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: Colors.red,
    marginTop: 30,
    marginBottom: 15,
  },
  inputContainer: {
    alignItems: 'center',
  },
});

type AuthScreenType = {
  children: Node,
  submitLabel: string,
  linkLabel: string,
  onSubmit: Function,
  onLinkPress: Function,
};

const AuthScreen = ({
  children,
  onSubmit,
  submitLabel,
  linkLabel,
  onLinkPress,
}: AuthScreenType) => (
  <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
    <ScrollView contentContainerStyle={Styles.flexGrow}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.logo} />
          <View style={styles.inputContainer}>{children}</View>
          <ActiveOpacity onPress={onSubmit}>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{submitLabel}</Text>
              </View>
            </View>
          </ActiveOpacity>
          <ActiveOpacity onPress={onLinkPress}>
            <View style={styles.linkButton}>
              <Text>{linkLabel}</Text>
            </View>
          </ActiveOpacity>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);

export default AuthScreen;
