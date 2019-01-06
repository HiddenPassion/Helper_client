// @flow
import React from 'react';
import {
  View, FlatList, Text, StyleSheet,
} from 'react-native';
import { compose, lifecycle, withHandlers } from 'recompose';
import AppScreen from '../../Components/AppScreen';
import ActiveOpacity from '../../Components/ActiveOpacity';
import { screen } from '../../Common/utils/navhelper';

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    marginTop: 20,
    paddingBottom: 30,
  },
  itemStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
  },
});

const keyExtractor = ({ id }) => id;

type UniversityType = {
  universities: Object,
  onItemPress: Function,
};

const University = ({ universities, onItemPress }: UniversityType) => (
  <AppScreen title="Select University">
    <FlatList
      keyExtractor={keyExtractor}
      style={styles.container}
      // contentContainerStyle
      data={universities}
      // ItemSepatatorComponent
      // ListFooterComponent
      renderItem={({ item: university }) => (
        <ActiveOpacity onPress={() => onItemPress(university)}>
          <View style={styles.itemStyle}>
            <Text>{`${university.fullName}(${university.shortName})`}</Text>
          </View>
        </ActiveOpacity>
      )}
    />
  </AppScreen>
);

const enhancer = compose(
  withHandlers({
    onItemPress: ({ navigator }) => university =>
      navigator.push(
        screen('helper.EditUniversity', {
          animationType: 'slide-horizontal',
          passProps: { university },
        }),
      ),
  }),
  lifecycle({
    componentDidMount() {
      const { dispatchFetchUniversityList } = this.props;
      dispatchFetchUniversityList();
    },
  }),
);

export default enhancer(University);
