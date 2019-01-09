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
import { Colors, Styles } from '../../Theme';
// import type { TextStyle } from '../../Common/RNPropTypes';
import Divider from '../../Components/Divider';
import AddFeedback from './Components/AddFeedback';
import { BackButton } from '../../Components/NavigationHeader';

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
    paddingVertical: 2,

  },
  lecturerInfoContainer: {
    paddingVertical: 15,
    marginVertical: 15,
    backgroundColor: Colors.white,
  },
  descriptionContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  redText: {
    color: Colors.red,
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
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: Colors.white,
  },
  lecturerIcon: {
    alignSelf: 'center',
  },
  lecturerFullName: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  lecturerDescription: {
    marginHorizontal: 25,
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
  onBack: Function,
  dispatchCreateFeedback: Function,
};

const Feedback = ({
  feedbacks,
  // onEditPress,
  fetchFeedbackList,
  user,
  lecturer,
  onBack,
  dispatchCreateFeedback,
}: FeedbackType) => (
  <AppScreen
    title="Feedbacks"
    renderLeftButton={() => <BackButton onPress={onBack} />}
  >
    <View style={styles.lecturerInfoContainer}>
      <Icon name="md-happy" size={150} style={styles.lecturerIcon} />
      <View style={styles.lecturerFullName}><Text>{lecturer.fullName}</Text></View>
      <View style={styles.lecturerDescription}><Text>{lecturer.description}</Text></View>
    </View>
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
              <View style={Styles.flexDirection}>
                <Text>{user.username}</Text>
                {feedback.User.id === user.id && (<Text style={styles.redText}>(You)</Text>)}
              </View>
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
    onBack: ({ navigator }) => () => navigator.pop(),
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
