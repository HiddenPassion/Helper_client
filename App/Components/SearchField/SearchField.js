// @flow
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { compose, withStateHandlers } from 'recompose';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../Theme';
import type { ViewStyle } from '../../Common/RNPropTypes';
import ActiveOpacity from '../ActiveOpacity';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
    paddingTop: 8,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightestGrey,
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 3,
  },
  textInput: {
    flex: 1,
    paddingVertical: 5,
    paddingRight: 10,
    paddingLeft: 0,
    marginRight: 20,
    backgroundColor: Colors.lightestGrey,
    color: Colors.charcoal,
    fontSize: 18,
  },
});

type SearchFieldType = {
  onSubmit: Function,
  value: string,
  onChange: Function,
  containerStyle?: ViewStyle,
  placeholder: string,
};

const SearchField = ({
  onSubmit,
  value,
  onChange,
  containerStyle,
  placeholder,
}: SearchFieldType) => (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.inputContainer}>
      <ActiveOpacity onPress={onSubmit}>
        <Icon style={styles.icon} name="md-search" size={24} />
      </ActiveOpacity>
      <TextInput
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        style={styles.textInput}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
        value={value}
        placeholder={placeholder}
      />
    </View>
  </View>
);

const enhancer = compose(
  withStateHandlers({
    value: '',
  }, {
    onChange: (state, { filteringHandler }) => (value) => {
      filteringHandler({ searchValue: value });
      return { value };
    },
    onSubmit: ({ value }, { filteringHandler }) => () => filteringHandler({ searchValue: value }),
  }),
);

export default enhancer(SearchField);
