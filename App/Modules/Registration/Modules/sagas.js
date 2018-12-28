// @flow
import { call } from 'redux-saga/effects';
import { createWatchers } from '../../../Common/Sagas';
import { REGISTER } from './duck';
import type { AnySaga } from '../../../Common/Sagas';

type RegistationPayloadType = {
  email: string,
  password: string,
  username: string,
  onSuccess: Function,
};

export default (api /* : ApiType */) => {
  function* registrationSaga({ payload }: RegistationPayloadType): AnySaga {
    try {
      const {
        email, username, password, onSuccess,
      } = payload;

      yield call(api.registration, {
        email,
        username,
        password,
      });

      yield onSuccess();
    } catch (err) {
      console.log(err);
    }
  }

  function* watchers() /* anySaga */ {
    yield createWatchers(REGISTER, registrationSaga);
  }

  return {
    watchers,
  };
};
