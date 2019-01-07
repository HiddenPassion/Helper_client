// @flow
import Immutable, { type ImmutableType } from 'seamless-immutable';
import { createSelector, type SelectorCreator } from 'reselect';
import { createDuck, type ActionCreator } from 'redux-duck';
import { type SubjectPayloadType } from './sagas';

const subjectDuck = createDuck('Subject');

export const FETCH_SUBJECT_LIST = subjectDuck.defineType('FETCH_SUBJECT_LIST');
export const FETCH_SUBJECT_LIST_RESPONSE = subjectDuck.defineType(
  'FETCH_SUBJECT_LIST_RESPONSE',
);
export const FILTER_SUBJECT_LIST = subjectDuck.defineType('FILTER_SUBJECT_LIST');
export const FILTER_SUBJECT_LIST_RESPONSE = subjectDuck.defineType(
  'FILTER_SUBJECT_LIST_RESPONSE',
);
export const FETCH_SUBJECT = subjectDuck.defineType('FETCH_SUBJECT');
export const FETCH_SUBJECT_RESPONSE = subjectDuck.defineType('FETCH_SUBJECT_RESPONSE');
// export const SELECT_SUBJECT = subjectDuck.defineType('SELECT_SUBJECT');
export const CREATE_SUBJECT = subjectDuck.defineType('CREATE_SUBJECT');
export const CREATE_SUBJECT_RESPONSE = subjectDuck.defineType('CREATE_SUBJECT_RESPONSE');
export const DELETE_SUBJECT = subjectDuck.defineType('DELETE_SUBJECT');
export const DELETE_SUBJECT_RESPONSE = subjectDuck.defineType('DELETE_SUBJECT_RESPONSE');
export const EDIT_SUBJECT = subjectDuck.defineType('EDIT_SUBJECT');
export const EDIT_SUBJECT_RESPONSE = subjectDuck.defineType('EDIT_SUBJECT_RESPONSE');

export const fetchSubjectList = subjectDuck.createAction(FETCH_SUBJECT_LIST);
export const fetchSubjectListResponse = subjectDuck.createAction(
  FETCH_SUBJECT_LIST_RESPONSE,
);
export const fetchSubject = subjectDuck.createAction(FETCH_SUBJECT);
export const filterSubjectList = subjectDuck.createAction(FILTER_SUBJECT_LIST);
export const filterSubjectListResponse = subjectDuck.createAction(
  FILTER_SUBJECT_LIST_RESPONSE,
);
export const fetchSubjectResponse = subjectDuck.createAction(FETCH_SUBJECT_RESPONSE);
// export const selectSubject = subjectDuck.createAction(SELECT_SUBJECT);
export const createSubject: ActionCreator<SubjectPayloadType> = subjectDuck.createAction(
  CREATE_SUBJECT,
);
export const createSubjectResponse = subjectDuck.createAction(CREATE_SUBJECT_RESPONSE);
export const deleteSubject = subjectDuck.createAction(DELETE_SUBJECT);
export const deleteSubjectResponse = subjectDuck.createAction(DELETE_SUBJECT_RESPONSE);
export const editSubject: ActionCreator<SubjectPayloadType> = subjectDuck.createAction(
  EDIT_SUBJECT,
);
export const editSubjectResponse = subjectDuck.createAction(EDIT_SUBJECT_RESPONSE);

type InitialStateType = {
  items: Array<Object>,
  filteredItems: Array<Object>,
  // selectedSubject: Object,
};

export const INITIAL_STATE: ImmutableType<InitialStateType> = Immutable.from({
  items: null,
  filteredItems: null,
  // selectedSubject: null,
});

const fetchSubjectListResponseHandler = (state, { payload: { items } }) =>
  state.merge({
    items,
    filteredItems: items,
  });

// const selectSubjectHandler = (state, { payload }) =>
//   state.set('selectedSubject', payload.subject);

const filterSubjectListHandler = (state, { payload: { filteredItems } }) =>
  state.set('filteredItems', filteredItems);

const reducer = subjectDuck.createReducer(
  {
    [FETCH_SUBJECT_LIST_RESPONSE]: fetchSubjectListResponseHandler,
    // [SELECT_SUBJECT]: selectSubjectHandler,
    [FILTER_SUBJECT_LIST_RESPONSE]: filterSubjectListHandler,
  },
  INITIAL_STATE,
);

const subjectState = state => state.subject;

export const selectSubjectItems: SelectorCreator = createSelector(
  subjectState,
  subject => subject.items,
);

export const selectFilteredSubjectList: SelectorCreator = createSelector(
  subjectState,
  subject => subject.filteredItems,
);
// export const selectHasSelectedSubject: SelectorCreator = createSelector(
//   subjectState,
//   subject => !!subject.selectedSubject,
// );
// export const selectSelectedSubject: SelectorCreator = createSelector(
//   subjectState,
//   subject => subject.selectedSubject,
// );

export default reducer;
