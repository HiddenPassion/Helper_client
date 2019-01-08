// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { compose, withStateHandlers } from 'recompose';
import { Colors } from '../../../../Theme';
import Button from '../../../../Components/Button';
import Input from '../../../../Components/Input';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonContainer: {
    // marginTop: 20,
    width: 70,
  },
  inputContainerStyle: {
    width: '100%',
  },
});

type AddFeedbackType = {
  description: ?string,
  onDescriptionChange: Function,
  onAddPress: Function,
};

const AddFeedback = ({
  description,
  onDescriptionChange,
  onAddPress,
}: AddFeedbackType) => (
  <View style={styles.container}>
    <Input
      containerStyle={styles.inputContainerStyle}
      value={description}
      placeholder="Input feedback"
      returnKeyType="done"
      onSubmitEditing={onAddPress}
      blurOnSubmit={false}
      multiline
      underlineColorAndroid={Colors.transparent}
      onChangeText={onDescriptionChange}
    />
    <View style={styles.buttonContainer}>
      <Button label="ADD" onPress={onAddPress} />
    </View>
  </View>
);

const enhancer = compose(
  withStateHandlers(
    {
      description: null,
    },
    {
      onDescriptionChange: () => description => ({ description }),
      onAddPress: ({ description }, { dispatchCreateFeedback, user, lecturer }) => () => {
        dispatchCreateFeedback({
          lecturerId: lecturer.id,
          userId: user.id,
          description,
        });

        return { description: null };
      },
    },
  ),
);

export default enhancer(AddFeedback);
