// @flow
import React, { type ComponentType } from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  NativeModules,
  PixelRatio,
  Platform,
  Keyboard,
} from 'react-native';
import type EmitterSubscription from 'react-native/Libraries/vendor/emitter/EmitterSubscription';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { Styles } from '../../Theme';

const STATUS_BAR_ANDROID_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');

export type KeyboardBehaviorType = null | 'height' | 'position' | 'padding';

export type SizeType = {
  screenWidth: number,
  screenHeight: number,
  orientation: string,
  showStatusBar: boolean,
  fullHeight: number,
  statusBarPadding: number,
  loginStatusBarPadding: number,
  keyboardBehavior: KeyboardBehaviorType,
  keyboardHeight: number,
};

export type WindowType = {
  width: number,
  height: number,
};

export type AndroidSystemUIResponseType = {
  screenWidth: number,
  screenHeight: number,
};

export const transformAndroidResponse = (
  response: AndroidSystemUIResponseType,
  keyboardHeight: number = 0,
) => {
  const { screenWidth: rawWidth, screenHeight: rawHeight } = response;
  const height = rawHeight / PixelRatio.get();
  return {
    width: rawWidth / PixelRatio.get(),
    height: keyboardHeight ? height + keyboardHeight : height,
  };
};

const withScreenSize = <T: Object>(Comp: ComponentType<T>) =>
  class extends React.PureComponent<T, SizeType> {
    constructor() {
      super();
      const { width, height } = Dimensions.get('window');
      this.state = this.getDisplayConfig(width, height, 0);
    }

    componentDidMount() {
      if (Platform.OS === 'android') {
        this.keyboardWillShow = Keyboard.addListener(
          'keyboardDidShow',
          this.keyboardWillShowHandler,
        );
        this.keyboardWillHide = Keyboard.addListener(
          'keyboardDidHide',
          this.keyboardWillHideHandler,
        );
        this.uiChangeListener = DeviceEventEmitter.addListener(
          'ANDROID_SYSTEM_UI_CHANGE',
          response => this.onSystemUiChange(response),
        );

        NativeModules.DetectHardware.getVisibleFrame().then(response =>
          this.onSystemUiChange(response));
      } else {
        this.updateSize(Dimensions.get('window'));
      }
      Dimensions.addEventListener('change', this.onDimensionsChange);
    }

    componentWillUnmount() {
      if (Platform.OS === 'android') {
        this.keyboardWillHide.remove();
        this.keyboardWillShow.remove();
        this.uiChangeListener.remove();
      }
      Dimensions.removeEventListener('change', this.onDimensionsChange);
    }

    onDimensionsChange = ({ window }: { window: WindowType }) => {
      if (Platform.OS === 'android') {
        NativeModules.DetectHardware.getVisibleFrame().then(response =>
          this.onSystemUiChange(response));
      } else {
        this.updateSize(window);
      }
    };

    onSystemUiChange = (response: AndroidSystemUIResponseType) => {
      const { keyboardHeight } = this.state;
      const systemResponse = transformAndroidResponse(response, keyboardHeight);
      this.updateSize(systemResponse);
    };

    getDisplayConfig = (width: number, height: number, keyboardHeight: number = 0) => {
      const orientation = width > height ? 'landscape' : 'portrait';
      const showStatusBar = orientation === 'portrait';
      const statusBarHeightAndroid = showStatusBar ? STATUS_BAR_ANDROID_HEIGHT : 0;
      const actualStatusBarHeight = statusBarHeightAndroid;
      const statusBarPadding = statusBarHeightAndroid;
      const loginStatusBarPadding = statusBarHeightAndroid;
      const keyboardBehavior = orientation === 'portrait' ? null : 'padding';

      return {
        screenWidth: width,
        screenHeight: height - actualStatusBarHeight,
        fullHeight: height,
        orientation,
        showStatusBar,
        statusBarPadding,
        loginStatusBarPadding,
        keyboardBehavior,
        keyboardHeight,
      };
    };

    keyboardWillHideHandler: any = () => {
      const { keyboardHeight } = this.state;
      if (keyboardHeight) {
        this.setState({ keyboardHeight: 0 }, () => {
          NativeModules.DetectHardware.getVisibleFrame().then(response =>
            this.updateSize(transformAndroidResponse(response, keyboardHeight)));
        });
      }
    };

    keyboardWillShowHandler: any = (e) => {
      this.setState({ keyboardHeight: e.endCoordinates.height });
    };

    updateSize = ({ width, height }: WindowType) => {
      const { keyboardHeight } = this.state;
      const newConfig = this.getDisplayConfig(width, height, keyboardHeight);
      this.setState(newConfig);
    };

    keyboardWillShow: any;

    keyboardWillHide: any;

    uiChangeListener: EmitterSubscription;

    render() {
      return <Comp style={Styles.flex} {...this.props} {...this.state} />;
    }
  };

export default withScreenSize;
