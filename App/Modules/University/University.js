// @flow
import React from 'react';
import {
  View, FlatList, Text, Alert, StyleSheet,
} from 'react-native';
import { compose, lifecycle, withHandlers } from 'recompose';
import AppScreen from '../../Components/AppScreen';
import ActiveOpacity from '../../Components/ActiveOpacity';
import { screen, startTabBaseApp } from '../../Common/utils/navhelper';
import { Colors } from '../../Theme';
import type { TextStyle } from '../../Common/RNPropTypes';
import Divider from '../../Components/Divider';
import SearchField from '../../Components/SearchField';
import { AddButton } from '../../Components/NavigationHeader';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  itemContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  universityInfo: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    minHeight: 40,
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  buttonBar: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  textButton: {
    fontWeight: '600',
    fontSize: 18,
  },
  deleteTextButton: {
    color: Colors.red,
  },
  editTextButton: {
    color: Colors.forestGreen,
  },
  searchFieldContainer: {
    backgroundColor: Colors.whiteSmoke,
  },
  contentContainerStyle: {
    backgroundColor: Colors.white,
  },
});

const keyExtractor = ({ id }) => id;

type ItemButtonType = {
  label: string,
  textStyle?: TextStyle,
  onPress: Function,
};

const ItemButton = ({ label, onPress, textStyle }: ItemButtonType) => (
  <ActiveOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text style={[styles.textButton, textStyle]}>{label}</Text>
    </View>
  </ActiveOpacity>
);

type UniversityType = {
  universities: Object,
  onItemPress: Function,
  onEditPress: Function,
  onCreatePress: Function,
  onDeletePress: Function,
  dispatchFetchUniversityList: Function, // need replace
  dispatchFilterUniversityList: Function, // ?
};

const University = ({
  universities,
  onItemPress,
  onEditPress,
  onCreatePress,
  onDeletePress,
  dispatchFetchUniversityList,
  dispatchFilterUniversityList,
}: UniversityType) => (
  <AppScreen
    title="Select University"
    renderRightButton={() => <AddButton onPress={onCreatePress} />}
  >
    <SearchField
      placeholder="Input university name"
      containerStyle={styles.searchFieldContainer}
      filteringHandler={dispatchFilterUniversityList}
    />
    <FlatList
      keyExtractor={keyExtractor}
      refreshing={false}
      onRefresh={dispatchFetchUniversityList}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      data={universities}
      ItemSeparatorComponent={Divider}
      // ListHeaderComponent={() => (
      //   <SearchField
      //     placeholder="Input university name"
      //     containerStyle={styles.searchFieldContainer}
      //     filteringHandler={dispatchFilterUniversityList}
      //   />
      // )}
      // ListFooterComponent
      renderItem={({ item: university }) => (
        <View style={styles.itemContainer}>
          <ActiveOpacity onPress={() => onItemPress(university)}>
            <View style={styles.universityInfo}>
              <Text style={styles.itemText}>
                {`${university.fullName}(${university.shortName})`}
              </Text>
            </View>
          </ActiveOpacity>
          <View style={styles.buttonBar}>
            <ItemButton
              label="EDIT"
              textStyle={styles.editTextButton}
              onPress={() => onEditPress(university)}
            />
            <ItemButton
              label="DELETE"
              onPress={() => onDeletePress(university)}
              textStyle={styles.deleteTextButton}
            />
          </View>
        </View>
      )}
    />
  </AppScreen>
);

const enhancer = compose(
  withHandlers({
    onItemPress: ({ dispatchSelectUniversity }) => university =>
      dispatchSelectUniversity({
        university,
        onSuccess: startTabBaseApp,
      }),
    onEditPress: ({ navigator }) => university =>
      navigator.push(
        screen('helper.EditUniversity', {
          animationType: 'slide-horizontal',
          passProps: { university },
        }),
      ),
    onCreatePress: ({ navigator }) => () =>
      navigator.push(
        screen('helper.CreateUniversity', {
          animationType: 'slide-horizontal',
        }),
      ),
    onDeletePress: ({ dispatchDeleteUniversity }) => ({ id, fullName, shortName }) =>
      Alert.alert(`You really want delete ${fullName}(${shortName})`, '', [
        {
          text: 'Yes',
          onPress: () => dispatchDeleteUniversity({ universityId: id }),
        },
        {
          text: 'No',
        },
      ]),
  }),
  lifecycle({
    componentDidMount() {
      const { dispatchFetchUniversityList } = this.props;
      dispatchFetchUniversityList();
    },
  }),
);

export default enhancer(University);
