// @flow
import Immutable, { type ImmutableType } from 'seamless-immutable';
import { createSelector, type SelectorCreator } from 'reselect';
import { createDuck, type ActionCreator } from 'redux-duck';
import { type FeedbackPayloadType } from './sagas';

const feedbackDuck = createDuck('Feedback');

export const FETCH_FEEDBACK_LIST = feedbackDuck.defineType('FETCH_FEEDBACK_LIST');
export const FETCH_FEEDBACK_LIST_RESPONSE = feedbackDuck.defineType(
  'FETCH_FEEDBACK_LIST_RESPONSE',
);
export const FETCH_FEEDBACK = feedbackDuck.defineType('FETCH_FEEDBACK');
export const FETCH_FEEDBACK_RESPONSE = feedbackDuck.defineType('FETCH_FEEDBACK_RESPONSE');
// export const SELECT_FEEDBACK = feedbackDuck.defineType('SELECT_FEEDBACK');
export const CREATE_FEEDBACK = feedbackDuck.defineType('CREATE_FEEDBACK');
export const CREATE_FEEDBACK_RESPONSE = feedbackDuck.defineType('CREATE_FEEDBACK_RESPONSE');
export const DELETE_FEEDBACK = feedbackDuck.defineType('DELETE_FEEDBACK');
export const DELETE_FEEDBACK_RESPONSE = feedbackDuck.defineType('DELETE_FEEDBACK_RESPONSE');
export const EDIT_FEEDBACK = feedbackDuck.defineType('EDIT_FEEDBACK');
export const EDIT_FEEDBACK_RESPONSE = feedbackDuck.defineType('EDIT_FEEDBACK_RESPONSE');

export const fetchFeedbackList = feedbackDuck.createAction(FETCH_FEEDBACK_LIST);
export const fetchFeedbackListResponse = feedbackDuck.createAction(
  FETCH_FEEDBACK_LIST_RESPONSE,
);
export const fetchFeedback = feedbackDuck.createAction(FETCH_FEEDBACK);
export const fetchFeedbackResponse = feedbackDuck.createAction(FETCH_FEEDBACK_RESPONSE);
export const createFeedback: ActionCreator<FeedbackPayloadType> = feedbackDuck.createAction(
  CREATE_FEEDBACK,
);
export const createFeedbackResponse = feedbackDuck.createAction(CREATE_FEEDBACK_RESPONSE);
export const deleteFeedback = feedbackDuck.createAction(DELETE_FEEDBACK);
export const deleteFeedbackResponse = feedbackDuck.createAction(DELETE_FEEDBACK_RESPONSE);
export const editFeedback: ActionCreator<FeedbackPayloadType> = feedbackDuck.createAction(
  EDIT_FEEDBACK,
);
export const editFeedbackResponse = feedbackDuck.createAction(EDIT_FEEDBACK_RESPONSE);

type InitialStateType = {
  items: Array<Object>,
};

export const INITIAL_STATE: ImmutableType<InitialStateType> = Immutable.from({
  items: null,
});

const fetchFeedbackListResponseHandler = (state, { payload: { items } }) =>
  state.set('items', items);

const reducer = feedbackDuck.createReducer(
  {
    [FETCH_FEEDBACK_LIST_RESPONSE]: fetchFeedbackListResponseHandler,
  },
  INITIAL_STATE,
);

const feedbackState = state => state.feedback;

export const selectFeedbackItems: SelectorCreator = createSelector(
  feedbackState,
  feedback => feedback.items,
);

export default reducer;
