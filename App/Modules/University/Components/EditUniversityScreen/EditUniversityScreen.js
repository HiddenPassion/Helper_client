// @flow
import React from 'react';
// import { StyleSheet } from 'react-native';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import FormScreen from '../../../../Components/FormScreen';
import Input from '../../../../Components/Input';
import { withRefs } from '../../../../Common/hocs';
import { Colors } from '../../../../Theme';

type EditUniversityScreenType = {
  onSave: Function,
  fullName: string,
  shortName: string,
  onFullNameChange: Function,
  onFullNameSubmit: Function,
  onShortNameChange: Function,
  refs: Object,
};

const EditUniversityScreen = ({
  onSave,
  fullName,
  shortName,
  refs,
  onFullNameChange,
  onFullNameSubmit,
  onShortNameChange,
}: EditUniversityScreenType) => (
  <FormScreen title="Editing university" footerButtonLabel="Save" onConfirmPress={onSave}>
    <Input
      value={fullName}
      placeholder="Full Name"
      returnKeyType="next"
      onSubmitEditing={onFullNameSubmit}
      blurOnSubmit={false}
      underlineColorAndroid={Colors.transparent}
      onChangeText={onFullNameChange}
    />
    <Input
      value={shortName}
      placeholder="Short Name"
      returnKeyType="done"
      inputRef={refs.save('shortNameInput')}
      onSubmitEditing={onSave}
      underlineColorAndroid={Colors.transparent}
      onChangeText={onShortNameChange}
    />
    <Input />
  </FormScreen>
);

const enhancer = compose(
  withRefs(),
  withStateHandlers(
    ({ university }) => ({
      fullName: university.fullName,
      shortName: university.shortName,
    }),
    {
      onFullNameChange: () => fullName => ({ fullName }),
      onShortNameChange: () => shortName => ({ shortName }),
    },
  ),
  withHandlers({
    onSave: ({
      fullName, shortName, dispatchEditUniversity, navigator, university,
    }) => () =>
      dispatchEditUniversity({
        id: university.id,
        fullName,
        shortName,
        onSuccess: () => navigator.pop(),
      }),
    onFullNameSubmit: ({ refs }) => () => {
      refs.shortNameInput.focus();
    },
  }),
);

export default enhancer(EditUniversityScreen);
