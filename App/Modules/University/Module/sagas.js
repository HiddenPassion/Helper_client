// @flow
import { call, put, select } from 'redux-saga/effects';
import { findIndex } from 'lodash';
import { createWatchers } from '../../../Common/Sagas';
import {
  FETCH_UNIVERSITY_LIST,
  fetchUniversityListResponse,
  selectUniversityItems,
  selectUniversity,
  EDIT_UNIVERSITY,
  CREATE_UNIVERSITY,
  // CREATE_UNIVERSITY,
  // DELETE_UNIVERSITY,
} from './duck';
import type { AnySaga } from '../../../Common/Sagas';

export type UniversityPayloadType = {
  id?: string,
  fullName: string,
  shortName: string,
  onSuccess: Function,
};

export default (api /* : ApiType */) => {
  function* fetchUniversityListSaga(): AnySaga {
    try {
      const {
        data: { universities },
      } = yield call(api.getUniversityList);
      yield put(fetchUniversityListResponse({ items: universities }));
    } catch (err) {
      console.log(err);
    }
  }

  function* editUniversity({
    payload: {
      id, fullName, shortName, onSuccess,
    },
  }: UniversityPayloadType): AnySaga {
    try {
      console.log(id);
      const {
        data: { university },
      } = yield call(api.editUniversity, { id, fullName, shortName });
      let universities = yield select(selectUniversityItems);
      universities = [...universities];
      const index = findIndex(universities, { id: university.id });
      universities.splice(index, 1, university);
      yield put(fetchUniversityListResponse({ items: universities }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function* createUniversity({ fullName, shortName, onSuccess }: UniversityPayloadType): AnySaga {
    try {
      const {
        data: { university },
      } = yield call(api, { fullName, shortName });
      const universities = yield select(selectUniversityItems);
      universities.spice(0, 0, university);
      yield put(selectUniversity, { university });
      yield put(fetchUniversityListResponse({ items: universities }));
      yield put(selectUniversity, { university });
      if (onSuccess) {
        onSuccess(university);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function* watchers(): AnySaga {
    yield createWatchers(FETCH_UNIVERSITY_LIST, fetchUniversityListSaga);
    yield createWatchers(EDIT_UNIVERSITY, editUniversity);
    yield createWatchers(CREATE_UNIVERSITY, createUniversity);
  }

  return {
    watchers,
  };
};
