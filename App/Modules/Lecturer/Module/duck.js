// @flow
import Immutable, { type ImmutableType } from 'seamless-immutable';
import { createSelector, type SelectorCreator } from 'reselect';
import { createDuck, type ActionCreator } from 'redux-duck';
import { type LecturerPayloadType } from './sagas';

const lecturerDuck = createDuck('Lecturer');

export const FETCH_LECTURER_LIST = lecturerDuck.defineType('FETCH_LECTURER_LIST');
export const FETCH_LECTURER_LIST_RESPONSE = lecturerDuck.defineType(
  'FETCH_LECTURER_LIST_RESPONSE',
);
export const FILTER_LECTURER_LIST = lecturerDuck.defineType('FILTER_LECTURER_LIST');
export const FILTER_LECTURER_LIST_RESPONSE = lecturerDuck.defineType(
  'FILTER_LECTURER_LIST_RESPONSE',
);
export const FETCH_LECTURER = lecturerDuck.defineType('FETCH_LECTURER');
export const FETCH_LECTURER_RESPONSE = lecturerDuck.defineType('FETCH_LECTURER_RESPONSE');
// export const SELECT_LECTURER = lecturerDuck.defineType('SELECT_LECTURER');
export const CREATE_LECTURER = lecturerDuck.defineType('CREATE_LECTURER');
export const CREATE_LECTURER_RESPONSE = lecturerDuck.defineType('CREATE_LECTURER_RESPONSE');
export const DELETE_LECTURER = lecturerDuck.defineType('DELETE_LECTURER');
export const DELETE_LECTURER_RESPONSE = lecturerDuck.defineType('DELETE_LECTURER_RESPONSE');
export const EDIT_LECTURER = lecturerDuck.defineType('EDIT_LECTURER');
export const EDIT_LECTURER_RESPONSE = lecturerDuck.defineType('EDIT_LECTURER_RESPONSE');

export const fetchLecturerList = lecturerDuck.createAction(FETCH_LECTURER_LIST);
export const fetchLecturerListResponse = lecturerDuck.createAction(
  FETCH_LECTURER_LIST_RESPONSE,
);
export const fetchLecturer = lecturerDuck.createAction(FETCH_LECTURER);
export const fetchLecturerResponse = lecturerDuck.createAction(FETCH_LECTURER_RESPONSE);
export const filterLecturerList = lecturerDuck.createAction(FILTER_LECTURER_LIST);
export const filterLecturerListResponse = lecturerDuck.createAction(
  FILTER_LECTURER_LIST_RESPONSE,
);
// export const selectLecturer = lecturerDuck.createAction(SELECT_LECTURER);
export const createLecturer: ActionCreator<LecturerPayloadType> = lecturerDuck.createAction(
  CREATE_LECTURER,
);
export const createLecturerResponse = lecturerDuck.createAction(CREATE_LECTURER_RESPONSE);
export const deleteLecturer = lecturerDuck.createAction(DELETE_LECTURER);
export const deleteLecturerResponse = lecturerDuck.createAction(DELETE_LECTURER_RESPONSE);
export const editLecturer: ActionCreator<LecturerPayloadType> = lecturerDuck.createAction(
  EDIT_LECTURER,
);
export const editLecturerResponse = lecturerDuck.createAction(EDIT_LECTURER_RESPONSE);

type InitialStateType = {
  items: Array<Object>,
  filteredItems: Array<Object>,
  // selectedLecturer: Object,
};

export const INITIAL_STATE: ImmutableType<InitialStateType> = Immutable.from({
  items: null,
  filteredItems: null,
  // selectedLecturer: null,
});

const fetchLecturerListResponseHandler = (state, { payload: { items } }) =>
  state.merge({
    items,
    filteredItems: items,
  });

// const selectLecturerHandler = (state, { payload }) =>
//   state.set('selectedLecturer', payload.lecturer);

const filterLecturerListHandler = (state, { payload: { filteredItems } }) =>
  state.set('filteredItems', filteredItems);

const reducer = lecturerDuck.createReducer(
  {
    [FETCH_LECTURER_LIST_RESPONSE]: fetchLecturerListResponseHandler,
    // [SELECT_LECTURER]: selectLecturerHandler,
    [FILTER_LECTURER_LIST_RESPONSE]: filterLecturerListHandler,
  },
  INITIAL_STATE,
);

const lecturerState = state => state.lecturer;

export const selectLecturerItems: SelectorCreator = createSelector(
  lecturerState,
  lecturer => lecturer.items,
);

export const selectFilteredLecturerList: SelectorCreator = createSelector(
  lecturerState,
  lecturer => lecturer.filteredItems,
);
// export const selectHasSelectedLecturer: SelectorCreator = createSelector(
//   lecturerState,
//   lecturer => !!lecturer.selectedLecturer,
// );
// export const selectSelectedLecturer: SelectorCreator = createSelector(
//   lecturerState,
//   lecturer => lecturer.selectedLecturer,
// );

export default reducer;
