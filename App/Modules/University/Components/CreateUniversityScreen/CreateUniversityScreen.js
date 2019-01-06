// @flow
import React from 'react';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import FormScreen from '../../../../Components/FormScreen';
import Input from '../../../../Components/Input';
import { withRefs } from '../../../../Common/hocs';
import { Colors } from '../../../../Theme';

type CreateUniversityScreenType = {
  onCreate: Function,
  fullName: string,
  shortName: string,
  onFullNameChange: Function,
  onFullNameSubmit: Function,
  onShortNameChange: Function,
  refs: Object,
};

const EditUniversityScreen = ({
  onCreate,
  fullName,
  shortName,
  refs,
  onFullNameChange,
  onFullNameSubmit,
  onShortNameChange,
}: CreateUniversityScreenType) => (
  <FormScreen title="Creating university" footerButtonLabel="Create" onConfirmPress={onCreate}>
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
      onSubmitEditing={onCreate}
      underlineColorAndroid={Colors.transparent}
      onChangeText={onShortNameChange}
    />
    <Input />
  </FormScreen>
);

const enhancer = compose(
  withRefs(),
  withStateHandlers(
    {
      fullName: null,
      shortName: null,
    },
    {
      onFullNameChange: () => fullName => ({ fullName }),
      onShortNameChange: () => shortName => ({ shortName }),
    },
  ),
  withHandlers({
    onCreate: ({
      fullName, shortName, dispatchEditUniversity, navigator,
    }) => () =>
      dispatchEditUniversity({
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