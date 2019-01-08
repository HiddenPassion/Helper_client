// @flow
import React from 'react';
import {
  View, FlatList, Text, StyleSheet,
} from 'react-native';
import { compose, lifecycle, withHandlers } from 'recompose';
import Icon from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../Components/AppScreen';
import ActiveOpacity from '../../Components/ActiveOpacity';
import { screen } from '../../Common/utils/navhelper';
import { Colors, Styles } from '../../Theme';
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
  lecturerInfo: {
    paddingLeft: 10,
    overflow: 'hidden',
    // width: '100%',
    flex: 1,
    // justifyContent: 'center',
  },
  lecturerInfoContainer: {
    minHeight: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    // maxWidth: '70%',
    flex: 1,
    overflow: 'hidden',
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
    minWidth: '30%',
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

type LecturerType = {
  lecturers: Object,
  onItemPress: Function,
  onEditPress: Function,
  onCreatePress: Function,
  fetchLecturerList: Function,
  dispatchFilterLecturerList: Function, // ?
};

const Lecturer = ({
  lecturers,
  onItemPress,
  onEditPress,
  onCreatePress,
  fetchLecturerList,
  dispatchFilterLecturerList,
}: LecturerType) => (
  <AppScreen title="Select lecturer" renderRightButton={() => <AddButton onPress={onCreatePress} />}>
    <SearchField
      placeholder="Input lecturer name"
      containerStyle={styles.searchFieldContainer}
      filteringHandler={dispatchFilterLecturerList}
    />
    <FlatList
      keyExtractor={keyExtractor}
      refreshing={false}
      onRefresh={fetchLecturerList}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      data={lecturers}
      ItemSeparatorComponent={Divider}
      renderItem={({ item: lecturer }) => (
        <View style={styles.itemContainer}>
          <View style={styles.lecturerInfoContainer}>
            <ActiveOpacity onPress={() => onItemPress(lecturer)}>
              <View style={Styles.flexDirection}>
                <Icon name="ios-contact" size={30} />
                <View style={styles.lecturerInfo}>
                  <Text style={styles.itemText} numberOfLines={1}>
                    {lecturer.fullName}
                  </Text>
                </View>
              </View>
            </ActiveOpacity>
          </View>
          <View style={styles.buttonBar}>
            <ItemButton
              label="EDIT"
              textStyle={styles.editTextButton}
              onPress={() => onEditPress(lecturer)}
            />
            <ItemButton
              label="DELETE"
              onPress={() => console.log(lecturer)}
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
    onItemPress: ({ navigator }) => lecturer => console.log(lecturer, navigator),
    onEditPress: ({ navigator }) => lecturer =>
      navigator.push(
        screen('helper.EditLecturer', {
          animationType: 'slide-horizontal',
          navigatorStyle: {
            tabBarHidden: true,
          },
          passProps: { lecturer },
        }),
      ),
    onCreatePress: ({ navigator, selectedUniversity }) => () =>
      navigator.push(
        screen('helper.CreateLecturer', {
          animationType: 'slide-horizontal',
          navigatorStyle: {
            tabBarHidden: true,
          },
          passProps: {
            universityId: selectedUniversity.id,
          },
        }),
      ),
    fetchLecturerList: ({ dispatchFetchLecturerList, selectedUniversity }) => () =>
      dispatchFetchLecturerList({ universityId: selectedUniversity.id }),
  }),
  lifecycle({
    componentDidMount() {
      const { fetchLecturerList } = this.props;
      fetchLecturerList();
    },
  }),
);

export default enhancer(Lecturer);
