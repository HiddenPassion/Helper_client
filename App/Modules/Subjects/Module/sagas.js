// @flow
import { call, put, select } from 'redux-saga/effects';
import { findIndex, filter } from 'lodash';
import { createWatchers } from '../../../Common/Sagas';
import {
  FETCH_SUBJECT_LIST,
  fetchSubjectListResponse,
  selectSubjectItems,
  FILTER_SUBJECT_LIST,
  filterSubjectListResponse,
  EDIT_SUBJECT,
  CREATE_SUBJECT,
  // DELETE_SUBJECT,
} from './duck';
import type { AnySaga } from '../../../Common/Sagas';

export type SubjectPayloadType = {
  payload: {
    id?: string,
    fullName: string,
    shortName: string,
    onSuccess: Function,
  },
};

export default (api /* : ApiType */) => {
  function* fetchSubjectListSaga({ payload: { universityId } }): AnySaga {
    try {
      const {
        data: { subjects },
      } = yield call(api.getSubjectList, { universityId });
      yield put(fetchSubjectListResponse({ items: subjects }));
    } catch (err) {
      console.log(err);
    }
  }

  function* editSubject({
    payload: {
      id, fullName, shortName, onSuccess,
    },
  }: SubjectPayloadType): AnySaga {
    try {
      const {
        data: { subject },
      } = yield call(api.editSubject, { id, fullName, shortName });
      let subjects = yield select(selectSubjectItems);
      subjects = [...subjects];
      const index = findIndex(subjects, { id: subject.id });
      subjects.splice(index, 1, subject);
      yield put(fetchSubjectListResponse({ items: subjects }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function* createSubject({
    payload: {
      universityId, fullName, shortName, onSuccess,
    },
  }: SubjectPayloadType): AnySaga {
    try {
      const {
        data: { subject },
      } = yield call(api.createSubject, { universityId, fullName, shortName });
      // let subjects = yield select(selectSubjectItems);
      // subjects = [...subjects];
      // subjects.splice(0, 0, subject);
      // yield put(selectSubject, { subject });
      const {
        data: { subjects },
      } = yield call(api.getSubjectList, { universityId });
      yield put(fetchSubjectListResponse({ items: subjects }));
      // yield put(selectSubject({ subject }));
      if (onSuccess) {
        onSuccess(subject);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function* filterSubject({ payload: { searchValue } }): AnySaga {
    try {
      const subjects = yield select(selectSubjectItems);
      const filteredItems = filter(subjects, ({ fullName, shortName }) => {
        const value = searchValue.toString().toLowerCase();
        return (
          fullName.toLowerCase().indexOf(value) > -1 || shortName.toLowerCase().indexOf(value) > -1
        );
      });
      yield put(filterSubjectListResponse({ filteredItems }));
    } catch (err) {
      console.log(err);
    }
  }

  function* watchers(): AnySaga {
    yield createWatchers(FETCH_SUBJECT_LIST, fetchSubjectListSaga);
    yield createWatchers(EDIT_SUBJECT, editSubject);
    yield createWatchers(CREATE_SUBJECT, createSubject);
    yield createWatchers(FILTER_SUBJECT_LIST, filterSubject);
  }

  return {
    watchers,
  };
};
