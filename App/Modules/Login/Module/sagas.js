// @flow
import { call, put } from 'redux-saga/effects';
import { createWatchers } from '../../../Common/Sagas';
import { LOGIN, loginResponse } from './duck';
import { extractToken } from './tokenUtils';

export default (api /* : ApiType */) => {
  function* loginSaga({ payload }) {
    try {
      const {
        data: {
          user: {
            username, email, isAdmin, id,
          },
          token,
        },
      } = yield call(api.login, {
        email: payload.email,
        password: payload.password,
      });

      yield put(
        loginResponse({
          username,
          email,
          token: extractToken(token),
          id,
          isAdmin,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  function* watchers() /* anySaga */ {
    yield createWatchers(LOGIN, loginSaga);
  }

  return {
    watchers,
  };
};
