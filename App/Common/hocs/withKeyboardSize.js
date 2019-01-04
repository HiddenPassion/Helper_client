// @flow
import React, { type ComponentType } from 'react';
import { Keyboard, Animated, Platform } from 'react-native';
import { Styles } from '../../Theme';
import type { SizeType } from './withScreenSize';


export type StateType = {
  isKeyboardOpened?: boolean,
  keyboardScreenY: number,
  animatedKeyboardScreenY: any
};

const withKeyboardSize = <T: Object>(Comp: ComponentType<T>) =>
  class extends React.Component<T, StateType> {
    state = {
      isKeyboardOpened: false,
      // eslint-disable-next-line
      keyboardScreenY: this.props.fullHeight,
      // eslint-disable-next-line
      animatedKeyboardScreenY: new Animated.Value(this.props.fullHeight),
    };

    componentDidMount() {
      this.keyboardWillShow = Keyboard.addListener(
        Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
        this.keyboardWillShowHandler,
      );
      this.keyboardWillHide = Keyboard.addListener(
        Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
        this.keyboardWillHideHandler,
      );
    }

    componentWillReceiveProps({ nextFullHeight }: SizeType) {
      const { fullHeight, keyboardScreenY } = this.props;
      if (nextFullHeight !== fullHeight) {
        this.update(keyboardScreenY + nextFullHeight - fullHeight);
      }
    }

    componentWillUnmount() {
      this.keyboardWillShow.remove();
      this.keyboardWillHide.remove();
    }

    update = (keyboardScreenY: number) => {
      const { animatedKeyboardScreenY } = this.state;
      animatedKeyboardScreenY.setValue(keyboardScreenY);
      this.setState({
        isKeyboardOpened: keyboardScreenY > 0,
        keyboardScreenY,
      });
    };

    keyboardWillHideHandler: any = () => {
      const { fullHeight } = this.props;
      this.update(fullHeight);
    };

    keyboardWillShowHandler: any = (e) => {
      this.update(e.endCoordinates.screenY);
    };

    keyboardWillShow: any;

    keyboardWillHide: any;

    render() {
      return (
        <Comp
          style={Styles.flex}
          {...this.props}
          {...this.state}
        />
      );
    }
  };

export default withKeyboardSize;
