// @flow
import Immutable, { type ImmutableType } from 'seamless-immutable';
import { createSelector, type SelectorCreator } from 'reselect';
import { createDuck, type ActionCreator } from 'redux-duck';
import { type UniversityPayloadType } from './sagas';

const universityDuck = createDuck('university');

export const FETCH_UNIVERSITY_LIST = universityDuck.defineType('FETCH_UNIVERSITY_LIST');
export const FETCH_UNIVERSITY_LIST_RESPONSE = universityDuck.defineType(
  'FETCH_UNIVERSITY_LIST_RESPONSE',
);
export const FILTER_UNIVERSITY_LIST = universityDuck.defineType('FILTER_UNIVERSITY_LIST');
export const FILTER_UNIVERSITY_LIST_RESPONSE = universityDuck.defineType(
  'FILTER_UNIVERSITY_LIST_RESPONSE',
);
export const FETCH_UNIVERSITY = universityDuck.defineType('FETCH_UNIVERSITY');
export const FETCH_UNIVERSITY_RESPONSE = universityDuck.defineType('FETCH_UNIVERSITY_RESPONSE');
export const SELECT_UNIVERSITY = universityDuck.defineType('SELECT_UNIVERSITY');
export const SELECT_UNIVERSITY_RESPONSE = universityDuck.defineType('SELECT_UNIVERSITY_RESPONSE');
export const CREATE_UNIVERSITY = universityDuck.defineType('CREATE_UNIVERSITY');
export const CREATE_UNIVERSITY_RESPONSE = universityDuck.defineType('CREATE_UNIVERSITY_RESPONSE');
export const DELETE_UNIVERSITY = universityDuck.defineType('DELETE_UNIVERSITY');
export const DELETE_UNIVERSITY_RESPONSE = universityDuck.defineType('DELETE_UNIVERSITY_RESPONSE');
export const EDIT_UNIVERSITY = universityDuck.defineType('EDIT_UNIVERSITY');
export const EDIT_UNIVERSITY_RESPONSE = universityDuck.defineType('EDIT_UNIVERSITY_RESPONSE');

export const fetchUniversityList = universityDuck.createAction(FETCH_UNIVERSITY_LIST);
export const fetchUniversityListResponse = universityDuck.createAction(
  FETCH_UNIVERSITY_LIST_RESPONSE,
);
export const fetchUniversity = universityDuck.createAction(FETCH_UNIVERSITY);
export const filterUniversityList = universityDuck.createAction(FILTER_UNIVERSITY_LIST);
export const filterUniversityListResponse = universityDuck.createAction(
  FILTER_UNIVERSITY_LIST_RESPONSE,
);
export const fetchUniversityResponse = universityDuck.createAction(FETCH_UNIVERSITY_RESPONSE);
export const selectUniversity = universityDuck.createAction(SELECT_UNIVERSITY);
export const selectUniversityResponse = universityDuck.createAction(SELECT_UNIVERSITY_RESPONSE);
export const createUniversity: ActionCreator<UniversityPayloadType> = universityDuck.createAction(
  CREATE_UNIVERSITY,
);
export const createUniversityResponse = universityDuck.createAction(CREATE_UNIVERSITY_RESPONSE);
export const deleteUniversity = universityDuck.createAction(DELETE_UNIVERSITY);
export const deleteUniversityResponse = universityDuck.createAction(DELETE_UNIVERSITY_RESPONSE);
export const editUniversity: ActionCreator<UniversityPayloadType> = universityDuck.createAction(
  EDIT_UNIVERSITY,
);
export const editUniversityResponse = universityDuck.createAction(EDIT_UNIVERSITY_RESPONSE);

type InitialStateType = {
  items: Array<Object>,
  filteredItems: Array<Object>,
  selectedUniversity: Object,
};

export const INITIAL_STATE: ImmutableType<InitialStateType> = Immutable.from({
  items: null,
  filteredItems: null,
  selectedUniversity: null,
});

const fetchUniversityListHandler = (state, { payload: { items } }) =>
  state.merge({
    items,
    filteredItems: items,
  });

const selectUniversityHandler = (state, { payload }) =>
  state.set('selectedUniversity', payload.university);

const filterUniversityListHandler = (state, { payload: { filteredItems } }) =>
  state.set('filteredItems', filteredItems);

const reducer = universityDuck.createReducer(
  {
    [FETCH_UNIVERSITY_LIST_RESPONSE]: fetchUniversityListHandler,
    [SELECT_UNIVERSITY_RESPONSE]: selectUniversityHandler,
    [FILTER_UNIVERSITY_LIST_RESPONSE]: filterUniversityListHandler,
  },
  INITIAL_STATE,
);

const universityState = state => state.university;

export const selectUniversityItems: SelectorCreator = createSelector(
  universityState,
  university => university.items,
);

export const selectFilteredUniversityList: SelectorCreator = createSelector(
  universityState,
  university => university.filteredItems,
);
export const selectHasSelectedUniversity: SelectorCreator = createSelector(
  universityState,
  university => !!university.selectedUniversity,
);
export const selectSelectedUniversity: SelectorCreator = createSelector(
  universityState,
  university => university.selectedUniversity,
);

export default reducer;
