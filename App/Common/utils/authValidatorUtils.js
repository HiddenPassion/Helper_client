// @flow
const validateEmail = val =>
  // eslint-disable-next-line
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val,
  );

const getEmailErrorMessage = (email) => {
  if (!email) {
    return 'Email is required';
  }

  if (validateEmail(email)) {
    return '';
  }

  return 'Email is not valid';
};

const getPasswordErrorMessage = (password) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must have more than 6 characters';
  }

  return '';
};

const getUsernameErrorMessage = (username) => {
  if (!username) {
    return 'Username is required';
  }

  if (username.length < 3) {
    return 'Username must have more than 3 characters';
  }

  return '';
};

export {
  getEmailErrorMessage,
  getPasswordErrorMessage,
  getUsernameErrorMessage,
  validateEmail,
};
