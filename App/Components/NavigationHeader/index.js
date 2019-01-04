// @flow
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { compose } from 'recompose';
import { withScreenSize } from '../../Common/hocs';
import ActiveOpacity from '../ActiveOpacity';
import TitleWrapper from './TitleWrapper';
import { Metrics, Colors } from '../../Theme';
import type { ViewStyle } from '../../Common/RNPropTypes';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    right: 0,
    left: 0,
    backgroundColor: Colors.whiteBackground,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.silver,
    zIndex: 1000,
  },
  titleLayer: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: Metrics.navigationHeaderHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLayer: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  spacer: {
    flex: 1,
  },
  hasSecondRow: {
    borderBottomColor: Colors.silverLight,
  },
});

export type NavBarProps = {
  title?: string,
  renderTitle?: Function,
  onPressTitle?: Function,
  renderRightButton?: Function,
  renderLeftButton?: Function,
  hasSecondRow?: boolean,
  orientation: string,
  statusBarPadding: number,
  statusBarColor?: string,
  headerStyle?: ViewStyle,
  screenWidth: number,
  touchableTitleWidth: number,
};

const NavBar = (props: NavBarProps) => {
  const {
    renderTitle,
    onPressTitle,
    renderRightButton,
    renderLeftButton,
    hasSecondRow,
    statusBarPadding,
    headerStyle,
    screenWidth,
    touchableTitleWidth,
  } = props;

  return (
    <View
      style={[
        styles.header,
        { height: Metrics.navigationHeaderHeight + statusBarPadding },
        hasSecondRow && styles.hasSecondRow,
        headerStyle,
      ]}
    >
      <View style={[styles.titleLayer, { top: statusBarPadding }]}>
        {renderTitle ? renderTitle(props) : (
          <TitleWrapper {...props} />
        )}
      </View>
      <View
        style={[
          styles.titleLayer,
          { top: statusBarPadding },
          styles.buttonLayer,
        ]}
      >
        {renderLeftButton && renderLeftButton()}
        <View style={styles.spacer} />
        {renderRightButton && renderRightButton()}
      </View>
      {onPressTitle && (
        <ActiveOpacity
          style={[
            styles.titleLayer,
            {
              top: statusBarPadding,
              left: (screenWidth - touchableTitleWidth) / 2,
              width: touchableTitleWidth,
            },
          ]}
          onPress={onPressTitle}
        />
      )}
    </View>
  );
};

NavBar.defaultProps = {
  hasSecondRow: false,
  // eslint-disable-next-line
  touchableTitleWidth: 0,
};

export default compose(
  withScreenSize,
)(NavBar);

export {
  TitleWrapper,
};
