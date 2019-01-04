// @flow
import React from 'react';
import type { Node } from 'react';
import { compose } from 'recompose';
import {
  View, StyleSheet, ScrollView, KeyboardAvoidingView,
} from 'react-native';
import { withScreenSize, hideStatusBarLandscape } from '../../Common/hocs';
import NavigationHeader from '../NavigationHeader';
import { Colors, Styles, Metrics } from '../../Theme';
import type { ViewStyle } from '../../Common/RNPropTypes';
import type { KeyboardBehaviorType } from '../../Common/hocs/withScreenSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    marginTop: Metrics.navigationHeaderHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.palePrim,
  },
});


type AppScreenProps = {
  children?: Node,
  statusBarPadding: number,
  statusBarColor?: string,
  hasFooter?: boolean,
  scrollDisabled?: boolean,
  style?: ViewStyle,
  FooterComponent?: Function,
  BackgroundComponent?: Function,
  scrollRef?: Function,
  scrollStyle?: ViewStyle,
  keyboardStyle?: ViewStyle,
  contentContainerStyle?: ViewStyle,
  showStatusBar: boolean,
  showNavHeader?: boolean,
  statusBarPadding: number,
  keyboardBehavior?: KeyboardBehaviorType,
};

const AppScreen = ({
  statusBarPadding, //
  children,
  style,
  showStatusBar = true, //
  showNavHeader = true,
  hasFooter,
  scrollRef,
  scrollStyle,
  scrollDisabled = false,
  contentContainerStyle,
  keyboardStyle,
  FooterComponent,
  BackgroundComponent,
  keyboardBehavior,
  ...props
}: AppScreenProps) => (
  <View style={[styles.container, style]}>
    {showNavHeader && (
      <NavigationHeader {...props} />
    )}
    <KeyboardAvoidingView
      style={[
        styles.keyboardAvoidingView,
        showStatusBar && {
          marginTop: Metrics.navigationHeaderHeight + statusBarPadding,
        },
        !showNavHeader && {
          marginTop: statusBarPadding,
        },
        keyboardStyle,
      ]}
      behavior={keyboardBehavior}
      enabled={keyboardBehavior !== undefined}
    >
      <View style={Styles.flex}>
        {!!BackgroundComponent && (
          <View style={StyleSheet.absoluteFill}>
            <BackgroundComponent />
          </View>
        )}
        <ScrollView
          ref={scrollRef}
          style={[styles.scrollView, scrollStyle]}
          scrollEnabled={!scrollDisabled}
          bounces={!scrollDisabled}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={contentContainerStyle || Styles.flexGrow}
        >
          {children}
        </ScrollView>
      </View>
      {!!FooterComponent && <FooterComponent />}
    </KeyboardAvoidingView>
  </View>
);

const enhancer = compose(
  withScreenSize,
  hideStatusBarLandscape,
);

export default enhancer(AppScreen);
