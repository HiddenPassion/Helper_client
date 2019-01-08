// @flow
import { call, put, select } from 'redux-saga/effects';
import { findIndex } from 'lodash';
import { createWatchers } from '../../../Common/Sagas';
import {
  FETCH_FEEDBACK_LIST,
  fetchFeedbackListResponse,
  selectFeedbackItems,
  EDIT_FEEDBACK,
  CREATE_FEEDBACK,
  // DELETE_FEEDBACK,
} from './duck';
import type { AnySaga } from '../../../Common/Sagas';
// import lecturerTransformer from './lecturerTransformer';

export type FeedbackPayloadType = {
  payload: {
    lecturerId?: string,
    description: string,
  },
};

export default (api /* : ApiType */) => {
  function* fetchFeedbackListSaga({ payload: { lecturerId } }): AnySaga {
    try {
      const {
        data: { feedbacks },
      } = yield call(api.getFeedbackList, { lecturerId });
      yield put(fetchFeedbackListResponse({ items: feedbacks }));
    } catch (err) {
      console.log(err);
    }
  }

  function* editFeedback({
    payload: {
      feedbackId, description, onSuccess,
    },
  }: FeedbackPayloadType): AnySaga {
    try {
      const {
        data: { feedback },
      } = yield call(api.editFeedback, {
        feedbackId,
        description,
      });
      let feedbacks = yield select(selectFeedbackItems);
      feedbacks = [...feedbacks];
      const index = findIndex(feedbacks, { id: feedback.id });
      feedbacks.splice(index, 1, feedback);
      yield put(fetchFeedbackListResponse({ items: feedbacks }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function* createFeedback({
    payload: {
      userId, lecturerId, description, onSuccess,
    },
  }: FeedbackPayloadType): AnySaga {
    try {
      const {
        data: { feedback },
      } = yield call(api.createFeedback, {
        userId,
        lecturerId,
        description,
      });
      const {
        data: { feedbacks },
      } = yield call(api.getFeedbackList, { lecturerId });
      yield put(fetchFeedbackListResponse({ items: feedbacks }));
      if (onSuccess) {
        onSuccess(feedback);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function* watchers(): AnySaga {
    yield createWatchers(FETCH_FEEDBACK_LIST, fetchFeedbackListSaga);
    yield createWatchers(EDIT_FEEDBACK, editFeedback);
    yield createWatchers(CREATE_FEEDBACK, createFeedback);
  }

  return {
    watchers,
  };
};
