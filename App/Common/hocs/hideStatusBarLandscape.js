// @flow
import React, { type ComponentType } from 'react';
import {
  Dimensions,
} from 'react-native';
import { type WindowType } from './withScreenSize';
import { Styles } from '../../Theme';

const hideStatusBarLandscape = <T: Object>(Comp: ComponentType<T>) =>
  class extends React.Component<T> {
    constructor() {
      super();
      this.currentWindow = Dimensions.get('window');
      this.visibilityStatus = '';
    }

    componentDidMount() {
      Dimensions.addEventListener('change', this.onDimensionsChange);
      const { navigator } = this.props;
      if (navigator) {
        navigator.addOnNavigatorEvent(this.onNavigationEvent);
      }
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.onDimensionsChange);
      const { navigator } = this.props;
      if (navigator) {
        // eslint-disable-next-line
        navigator._removeOnNavigatorEvent(this.onNavigationEvent);
      }
    }

    onDimensionsChange = ({ window }: { window: WindowType }) => {
      this.currentWindow = window;
      this.setStatusBarVisibility(window);
    }

    onNavigationEvent = (e: { id: string }) => {
      this.visibilityStatus = e.id;
      this.setStatusBarVisibility(this.currentWindow);
    }

    setStatusBarVisibility = (window: WindowType) => {
      if (this.visibilityStatus !== 'didAppear') {
        return false;
      }

      const { navigator } = this.props;
      if (window.width > window.height) {
        navigator.setStyle({ statusBarHidden: true });
      } else if (navigator) {
        navigator.setStyle({ statusBarHidden: false });
      }
      return true;
    }

    currentWindow : WindowType

    visibilityStatus: string

    render() {
      return (
        <Comp
          style={Styles.flex}
          {...this.props}
        />
      );
    }
  };

export default hideStatusBarLandscape;
