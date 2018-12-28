// @flow
import React, { type Node } from 'react';
import { TouchableOpacity } from 'react-native';

type DmxActiveOpacityType = {
  children?: Node,
};

const DmxActiveOpacity = ({ children, ...props }: DmxActiveOpacityType) => (
  <TouchableOpacity activeOpacity={0.7} {...props}>
    {children}
  </TouchableOpacity>
);

export default DmxActiveOpacity;
