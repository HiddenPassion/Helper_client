// @flow
import React from 'react';
import { Keyboard } from 'react-native';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { Colors } from '../../Theme';
import { getPasswordErrorMessage, getEmailErrorMessage } from '../../Common/utils/authValidatorUtils';
import Input from '../../Components/Input';
import withRefs from '../../Common/hocs/withRefs';
import AuthScreen from '../../Components/AuthScreen';
import { screen } from '../../Common/utils/navhelper';

type LoginType = {
  email: {
    value: string,
    error: string,
  },
  password: {
    value: string,
    error: string,
  },
  onEmailBlur: Function,
  onEmailChange: Function,
  onPasswordBlur: Function,
  onPasswordChange: Function,
  onLinkPress: Function,
  onLogin: Function,
  onEmailSubmit: Function,
  refs: Object,
};

const Login = ({
  email: { value: emailValue, error: emailError },
  password: { value: passwordValue, error: passwordError },
  onEmailChange,
  onPasswordChange,
  onEmailBlur,
  onPasswordBlur,
  onLogin,
  onEmailSubmit,
  onLinkPress,
  refs,
}: LoginType) => (
  <AuthScreen
    onSubmit={onLogin}
    submitLabel="LOGIN"
    linkLabel="Don't have an account? Tap to register"
    onLinkPress={onLinkPress}
  >
    <Input
      value={emailValue}
      placeholder="email"
      returnKeyType="next"
      onSubmitEditing={onEmailSubmit}
      blurOnSubmit={false}
      onBlur={onEmailBlur}
      keyboardType="email-address"
      underlineColorAndroid={emailError ? Colors.red : Colors.white}
      onChangeText={onEmailChange}
      errorMessage={emailError}
    />
    <Input
      value={passwordValue}
      placeholder="password"
      returnKeyType="done"
      inputRef={refs.save('passwordInput')}
      onSubmitEditing={onLogin}
      onBlur={onPasswordBlur}
      secureTextEntry
      underlineColorAndroid={passwordError ? Colors.red : Colors.white}
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
    onLogin: ({ email, password, dispatchLogin }) => () => {
      if (!email.error && !password.error && email.value && password.value) {
        // login
        Keyboard.dismiss();
        dispatchLogin({
          email: email.value,
          password: password.value,
        });
      }
    },
    onLinkPress: ({ navigator }) => () => navigator.push(screen('helper.Registration', {
      animationType: 'slide-horizontal',
    })),
    onEmailSubmit: ({ refs }) => () => {
      refs.passwordInput.focus();
    },
  }),
);

export default enhancer(Login);
