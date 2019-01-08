// @flow
import React from 'react';
import {
  View, FlatList, Text, StyleSheet,
} from 'react-native';
import { compose, lifecycle, withHandlers } from 'recompose';
import AppScreen from '../../Components/AppScreen';
import ActiveOpacity from '../../Components/ActiveOpacity';
import { screen } from '../../Common/utils/navhelper';
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
  subjectInfo: {
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

type SubjectType = {
  subjects: Object,
  onItemPress: Function,
  onEditPress: Function,
  onCreatePress: Function,
  fetchSubjectList: Function,
  dispatchFilterSubjectList: Function, // ?
};

const Subject = ({
  subjects,
  onItemPress,
  onEditPress,
  onCreatePress,
  fetchSubjectList,
  dispatchFilterSubjectList,
}: SubjectType) => (
  <AppScreen title="Select subject" renderRightButton={() => <AddButton onPress={onCreatePress} />}>
    <SearchField
      placeholder="Input subject name"
      containerStyle={styles.searchFieldContainer}
      filteringHandler={dispatchFilterSubjectList}
    />
    <FlatList
      keyExtractor={keyExtractor}
      refreshing={false}
      onRefresh={fetchSubjectList}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      data={subjects}
      ItemSeparatorComponent={Divider}
      renderItem={({ item: subject }) => (
        <View style={styles.itemContainer}>
          <ActiveOpacity onPress={() => onItemPress(subject)}>
            <View style={styles.subjectInfo}>
              <Text style={styles.itemText}>
                {`${subject.fullName}(${subject.shortName})`}
              </Text>
            </View>
          </ActiveOpacity>
          <View style={styles.buttonBar}>
            <ItemButton
              label="EDIT"
              textStyle={styles.editTextButton}
              onPress={() => onEditPress(subject)}
            />
            <ItemButton
              label="DELETE"
              onPress={() => console.log(subject)}
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
    onItemPress: ({ navigator }) => subject => console.log(subject, navigator),
    onEditPress: ({ navigator }) => subject =>
      navigator.push(
        screen('helper.EditSubject', {
          animationType: 'slide-horizontal',
          navigatorStyle: {
            tabBarHidden: true,
          },
          passProps: { subject },
        }),
      ),
    onCreatePress: ({ navigator, selectedUniversity }) => () =>
      navigator.push(
        screen('helper.CreateSubject', {
          animationType: 'slide-horizontal',
          navigatorStyle: {
            tabBarHidden: true,
          },
          passProps: {
            universityId: selectedUniversity.id,
          },
        }),
      ),
    fetchSubjectList: ({ dispatchFetchSubjectList, selectedUniversity }) => () =>
      dispatchFetchSubjectList({ universityId: selectedUniversity.id }),
  }),
  lifecycle({
    componentDidMount() {
      const { fetchSubjectList } = this.props;
      fetchSubjectList();
    },
  }),
);

export default enhancer(Subject);
