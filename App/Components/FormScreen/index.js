// @flow
import React, { type Node } from 'react';
import { View, StyleSheet } from 'react-native';
import { compose } from 'recompose';
import AppScreen from '../AppScreen';
import Button from '../Button';


const styles = StyleSheet.create({
  scrollStyle: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  container: {
    alignItems: 'center',
  },
});

type FormScreenType = {
  title?: string,
  footerButtonLabel: string,
  confirmButtonDisabled?: boolean,
  onConfirmPress: Function,
  children: Node,
};

const FormScreen = ({
  title,
  footerButtonLabel,
  confirmButtonDisabled,
  children,
  onConfirmPress,
}: FormScreenType) => (
  <AppScreen
    title={title}
    scrollStyle={styles.scrollStyle}
    FooterComponent={() => (
      <Button label={footerButtonLabel} disabled={confirmButtonDisabled} onPress={onConfirmPress} />
    )}
  >
    <View style={styles.container}>
      {children}
    </View>
  </AppScreen>
);

const enhancer = compose();

export default enhancer(FormScreen);
