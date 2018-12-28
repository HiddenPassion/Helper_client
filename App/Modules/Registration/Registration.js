// @flow
import React from 'react';
import { Keyboard } from 'react-native';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import withRefs from '../../Common/hocs/withRefs';
import {
  getEmailErrorMessage,
  getPasswordErrorMessage,
  getUsernameErrorMessage,
} from '../../Common/utils/authValidatorUtils';
import Input from '../../Components/Input';
import AuthScreen from '../../Components/AuthScreen';
import { Colors } from '../../Theme';
import { screen } from '../../Common/utils/navhelper';

type RegistrationType = {
  onRegister: Function,
  email: { value: string, error: string },
  password: { value: string, error: string },
  username: { value: string, error: string },
  onEmailSubmit: Function,
  onEmailBlur: Function,
  onEmailChange: Function,
  onUsernameSubmit: Function,
  onUsernameBlur: Function,
  onUsernameChange: Function,
  onPasswordBlur: Function,
  onPasswordChange: Function,
  refs: Object,
};

const Registration = ({
  onRegister,
  email: { value: emailValue, error: emailError },
  password: { value: passwordValue, error: passwordError },
  username: { value: usernameValue, error: usernameError },
  onEmailSubmit,
  onEmailBlur,
  onEmailChange,
  onUsernameSubmit,
  onUsernameBlur,
  onUsernameChange,
  onPasswordBlur,
  onPasswordChange,
  refs,
}: RegistrationType) => (
  <AuthScreen onSubmit={onRegister} submitLabel="REGISTER">
    <Input
      value={emailValue}
      placeholder="email"
      returnKeyType="next"
      onSubmitEditing={onEmailSubmit}
      blurOnSubmit={false}
      onBlur={onEmailBlur}
      keyboardType="email-address"
      underlineColorAndroid={emailError ? Colors.red : Colors.transparent}
      onChangeText={onEmailChange}
      errorMessage={emailError}
    />
    <Input
      value={usernameValue}
      placeholder="username"
      returnKeyType="next"
      onSubmitEditing={onUsernameSubmit}
      inputRef={refs.save('usernameInput')}
      blurOnSubmit={false}
      onBlur={onUsernameBlur}
      // keyboardType="email-address"
      underlineColorAndroid={passwordError ? Colors.red : Colors.transparent}
      onChangeText={onUsernameChange}
      errorMessage={usernameError}
    />
    <Input
      value={passwordValue}
      placeholder="password"
      returnKeyType="done"
      inputRef={refs.save('passwordInput')}
      onSubmitEditing={onRegister}
      onBlur={onPasswordBlur}
      keyboardType="email-address"
      underlineColorAndroid={passwordError ? Colors.red : Colors.transparent}
      onChangeText={onPasswordChange}
      errorMessage={passwordError}
    />
  </AuthScreen>
);

const controlsTemplate = {
  value: '',
  error: '',
  touched: false,
};

const enhancer = compose(
  withRefs(),
  withStateHandlers(
    {
      email: { ...controlsTemplate },
      username: { ...controlsTemplate },
      password: { ...controlsTemplate },
    },
    {
      onEmailChange: ({ email }) => value => ({
        email: {
          ...email,
          value,
          error: email.touched ? getEmailErrorMessage(value) : email.error,
        },
      }),
      onUsernameChange: ({ username }) => value => ({
        username: {
          ...username,
          value,
          error: username.touched ? getUsernameErrorMessage(value) : username.error, //
        },
      }),
      onPasswordChange: ({ password }) => value => ({
        password: {
          ...password,
          value,
          error: password.touched ? getPasswordErrorMessage(value) : password.error,
        },
      }),
      onEmailBlur: ({ email }) => () => ({
        email: {
          ...email,
          touched: true,
          error: getEmailErrorMessage(email.value),
        },
      }),
      onUsernameBlur: ({ username }) => () => ({
        username: {
          ...username,
          touched: true,
          error: getUsernameErrorMessage(username.value),
        },
      }),
      onPasswordBlur: ({ password }) => () => ({
        password: {
          ...password,
          touched: true,
          error: getPasswordErrorMessage(password.value),
        },
      }),
    },
  ),
  withHandlers({
    backToLogin: ({ navigator }) => () =>
      navigator.resetTo(
        screen('helper.Login', {
          animationType: 'slide-horizontal',
          // passProps: {}
        }),
      ),
  }),
  withHandlers({
    onRegister: ({
      email, password, username, dispatchRegister, backToLogin,
    }) => () => {
      if (
        !email.error
        && !password.error
        && email.value
        && password.value
        && !username.error
        && username.value
      ) {
        // login
        Keyboard.dismiss();
        dispatchRegister({
          email: email.value,
          password: password.value,
          username: username.value,
          onSuccess: backToLogin,
        });
      }
    },
    onEmailSubmit: ({ refs }) => () => {
      refs.usernameInput.focus();
    },
    onUsernameSubmit: ({ refs }) => () => {
      refs.passwordInput.focus();
    },
  }),
);

export default enhancer(Registration);
