// @flow
import React from 'react';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import FormScreen from '../../../../Components/FormScreen';
import Input from '../../../../Components/Input';
import { withRefs } from '../../../../Common/hocs';
import { Colors } from '../../../../Theme';
import type { NavigatorPropsType } from '../../../../Common/RNPropTypes';

type CreateLecturerScreenType = {
  onSave: Function,
  name: string,
  surname: string,
  patronymic: string,
  description: string,
  imageUrl: string,
  onNameChange: Function,
  onSurnameChange: Function,
  onPatronymicChange: Function,
  onDescriptionChange: Function,
  onImageUrlChange: Function,
  onNameSubmit: Function,
  onSurnameSubmit: Function,
  onPatronymicSubmit: Function,
  onDescriptionSubmit: Function,
  refs: Object,
  navigator: NavigatorPropsType,
};

const EditLecturerScreen = ({
  onSave,
  name,
  surname,
  patronymic,
  description,
  imageUrl,
  refs,
  onNameChange,
  onSurnameChange,
  onPatronymicChange,
  onDescriptionChange,
  onImageUrlChange,
  onNameSubmit,
  onSurnameSubmit,
  onPatronymicSubmit,
  onDescriptionSubmit,
  navigator,
}: CreateLecturerScreenType) => (
  <FormScreen
    title="Creating subject"
    footerButtonLabel="Create"
    onConfirmPress={onSave}
    navigator={navigator}
  >
    <Input
      value={name}
      placeholder="Name"
      returnKeyType="next"
      onSubmitEditing={onNameSubmit}
      blurOnSubmit={false}
      underlineColorAndroid={Colors.transparent}
      onChangeText={onNameChange}
    />
    <Input
      value={surname}
      placeholder="Surname"
      returnKeyType="next"
      onSubmitEditing={onSurnameSubmit}
      inputRef={refs.save('surnameInput')}
      blurOnSubmit={false}
      underlineColorAndroid={Colors.transparent}
      onChangeText={onSurnameChange}
    />
    <Input
      value={patronymic}
      placeholder="Patronymic"
      returnKeyType="next"
      onSubmitEditing={onPatronymicSubmit}
      inputRef={refs.save('patronymicInput')}
      blurOnSubmit={false}
      underlineColorAndroid={Colors.transparent}
      onChangeText={onPatronymicChange}
    />
    <Input
      value={description}
      placeholder="Description"
      returnKeyType="next"
      onSubmitEditing={onDescriptionSubmit}
      inputRef={refs.save('descriptionInput')}
      blurOnSubmit={false}
      underlineColorAndroid={Colors.transparent}
      onChangeText={onDescriptionChange}
    />
    <Input // TODO: must be replace to image loader
      value={imageUrl}
      placeholder="Image URL"
      returnKeyType="done"
      onSubmitEditing={onSave}
      inputRef={refs.save('imageUrlInput')}
      underlineColorAndroid={Colors.transparent}
      onChangeText={onImageUrlChange}
    />
  </FormScreen>
);

const enhancer = compose(
  withRefs(),
  withStateHandlers(
    ({
      lecturer: {
        name, surname, patronymic, description, imageUrl,
      },
    }) => ({
      name,
      surname,
      patronymic,
      description,
      imageUrl,
    }),
    {
      onNameChange: () => name => ({ name }),
      onSurnameChange: () => surname => ({ surname }),
      onPatronymicChange: () => patronymic => ({ patronymic }),
      onDescriptionChange: () => description => ({ description }),
      onImageUrlChange: () => imageUrl => ({ imageUrl }),
    },
  ),
  withHandlers({
    onSave: ({
      lecturer,
      name,
      surname,
      patronymic,
      description,
      imageUrl,
      dispatchEditLecturer,
      navigator,
    }) => () =>
      dispatchEditLecturer({
        lecturerId: lecturer.id,
        name,
        surname,
        patronymic,
        description,
        imageUrl,
        onSuccess: () => navigator.pop(),
      }),
    onNameSubmit: ({ refs }) => () => {
      refs.surnameInput.focus();
    },
    onSurnameSubmit: ({ refs }) => () => {
      refs.patronymicInput.focus();
    },
    onPatronymicSubmit: ({ refs }) => () => {
      refs.descriptionInput.focus();
    },
    onDescriptionSubmit: ({ refs }) => () => {
      refs.imageUrlInput.focus();
    },
  }),
);

export default enhancer(EditLecturerScreen);
