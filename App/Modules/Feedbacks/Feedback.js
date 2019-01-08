// @flow
import React from 'react';
import {
  View, FlatList, Text, StyleSheet,
} from 'react-native';
import { compose, lifecycle, withHandlers } from 'recompose';
import Icon from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../Components/AppScreen';
// import ActiveOpacity from '../../Components/ActiveOpacity';
import { screen } from '../../Common/utils/navhelper';
import { Colors } from '../../Theme';
// import type { TextStyle } from '../../Common/RNPropTypes';
import Divider from '../../Components/Divider';
import AddFeedback from './Components/AddFeedback';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  itemContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  lecturerInfoContainer: {
    height: 200,
    width: '100%',
    backgroundColor: Colors.palePrim,
  },
  descriptionContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  // button: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 5,
  // },
  // buttonBar: {
  //   flexDirection: 'row',
  //   marginRight: 10,
  //   minWidth: '30%',
  //   alignItems: 'center',
  // },
  // textButton: {
  //   fontWeight: '600',
  //   fontSize: 18,
  // },
  // deleteTextButton: {
  //   color: Colors.red,
  // },
  // editTextButton: {
  //   color: Colors.forestGreen,
  // },
  contentContainerStyle: {
    backgroundColor: Colors.white,
  },
});

const keyExtractor = ({ id }) => id;

// type ItemButtonType = {
//   label: string,
//   textStyle?: TextStyle,
//   onPress: Function,
// };

// const ItemButton = ({ label, onPress, textStyle }: ItemButtonType) => (
//   <ActiveOpacity onPress={onPress}>
//     <View style={styles.button}>
//       <Text style={[styles.textButton, textStyle]}>{label}</Text>
//     </View>
//   </ActiveOpacity>
// );

type FeedbackType = {
  feedbacks: Object,
  user: Object,
  lecturer: Object,
  onEditPress: Function,
  fetchFeedbackList: Function,
  dispatchCreateFeedback: Function,
};

const Feedback = ({
  feedbacks,
  // onEditPress,
  fetchFeedbackList,
  user,
  lecturer,
  dispatchCreateFeedback,
}: FeedbackType) => (
  <AppScreen
    title="Feedbacks"
  >
    <View style={styles.lecturerInfoContainer} />
    <FlatList
      keyExtractor={keyExtractor}
      refreshing={false}
      onRefresh={fetchFeedbackList}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      data={feedbacks}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={() => (
        <AddFeedback
          user={user}
          lecturer={lecturer}
          dispatchCreateFeedback={dispatchCreateFeedback}
        />
      )}
      renderItem={({ item: feedback }) => (
        <View style={styles.itemContainer}>
          <View style={styles.userInfoContainer}>
            <Icon name="ios-contact" size={30} />
            <View style={styles.userInfo}>
              <Text>{user.username}</Text>
              <Text>{feedback.updatedAt}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text>{feedback.description}</Text>
          </View>
        </View>
      )}
    />
  </AppScreen>
);

const enhancer = compose(
  withHandlers({
    onEditPress: ({ navigator }) => feedback =>
      navigator.push(
        screen('helper.EditFeedback', {
          animationType: 'slide-horizontal',
          navigatorStyle: {
            tabBarHidden: true,
          },
          passProps: { feedback },
        }),
      ),
    fetchFeedbackList: ({ dispatchFetchFeedbackList, lecturer }) => () =>
      dispatchFetchFeedbackList({ lecturerId: lecturer.id }),
  }),
  lifecycle({
    componentDidMount() {
      const { fetchFeedbackList } = this.props;
      fetchFeedbackList();
    },
  }),
);

export default enhancer(Feedback);

/* <View style={styles.buttonBar}>
      <ItemButton
        label="EDIT"
        textStyle={styles.editTextButton}
        onPress={() => onEditPress(feedback)}
      />
      <ItemButton
        label="DELETE"
        onPress={() => console.log(feedback)}
        textStyle={styles.deleteTextButton}
      />
    </View> */
