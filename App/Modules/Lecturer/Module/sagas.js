// @flow
import { call, put, select } from 'redux-saga/effects';
import { findIndex, filter } from 'lodash';
import { createWatchers } from '../../../Common/Sagas';
import {
  FETCH_LECTURER_LIST,
  fetchLecturerListResponse,
  selectLecturerItems,
  FILTER_LECTURER_LIST,
  filterLecturerListResponse,
  EDIT_LECTURER,
  CREATE_LECTURER,
  // DELETE_LECTURER,
} from './duck';
import type { AnySaga } from '../../../Common/Sagas';
import lecturerTransformer from './lecturerTransformer';

export type LecturerPayloadType = {
  payload: {
    lecturerId?: string,
    name: string,
    surname: string,
    patronymic: string,
    description: string,
    imageUrl: string,
    onSuccess: Function,
  },
};

export default (api /* : ApiType */) => {
  function* fetchLecturerListSaga({ payload: { universityId } }): AnySaga {
    try {
      const {
        data: { lecturers },
      } = yield call(api.getLecturerList, { universityId });
      lecturerTransformer(lecturers);
      yield put(fetchLecturerListResponse({ items: lecturers }));
    } catch (err) {
      console.log(err);
    }
  }

  function* editLecturer({
    payload: {
      lecturerId, name, surname, patronymic, description, imageUrl, onSuccess,
    },
  }: LecturerPayloadType): AnySaga {
    try {
      const {
        data: { lecturer },
      } = yield call(api.editLecturer, {
        lecturerId,
        name,
        surname,
        patronymic,
        description,
        imageUrl,
      });
      lecturerTransformer(lecturer);
      let lecturers = yield select(selectLecturerItems);
      lecturers = [...lecturers];
      const index = findIndex(lecturers, { id: lecturer.id });
      lecturers.splice(index, 1, lecturer);
      yield put(fetchLecturerListResponse({ items: lecturers }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function* createLecturer({
    payload: {
      universityId, name, surname, patronymic, description, imageUrl, onSuccess,
    },
  }: LecturerPayloadType): AnySaga {
    try {
      const {
        data: { lecturer },
      } = yield call(api.createLecturer, {
        universityId,
        name,
        surname,
        patronymic,
        description,
        imageUrl,
      });
      const {
        data: { lecturers },
      } = yield call(api.getLecturerList, { universityId });
      lecturerTransformer(lecturers);
      yield put(fetchLecturerListResponse({ items: lecturers }));
      if (onSuccess) {
        onSuccess(lecturer);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function* filterLecturer({ payload: { searchValue } }): AnySaga {
    try {
      const lecturers = yield select(selectLecturerItems);
      const filteredItems = filter(lecturers, ({ fullName }) => {
        const value = searchValue.toString().toLowerCase();
        return fullName.toLowerCase().indexOf(value) > -1;
      });
      yield put(filterLecturerListResponse({ filteredItems }));
    } catch (err) {
      console.log(err);
    }
  }

  function* watchers(): AnySaga {
    yield createWatchers(FETCH_LECTURER_LIST, fetchLecturerListSaga);
    yield createWatchers(EDIT_LECTURER, editLecturer);
    yield createWatchers(CREATE_LECTURER, createLecturer);
    yield createWatchers(FILTER_LECTURER_LIST, filterLecturer);
  }

  return {
    watchers,
  };
};
