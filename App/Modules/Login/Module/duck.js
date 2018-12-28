// @flow
import { createDuck, type ActionCreator } from 'redux-duck';
import { createSelector, type SelectorCreator } from 'reselect';
import Immutable, { type ImmutableType } from 'seamless-immutable';

const duck = createDuck('login');

export const LOGIN = duck.defineType('LOGIN');
export const LOGIN_RESPONSE = duck.defineType('LOGIN_RESPONSE');
export const LOGOUT = duck.defineType('LOGOUT');

type LoginPayload = { email: string, password: string };

export const login: ActionCreator<LoginPayload> = duck.createAction(LOGIN);
export const loginResponse = duck.createAction(LOGIN_RESPONSE);
export const logout = duck.createAction(LOGOUT);

export const INITIAL_STATE: ImmutableType<> = Immutable.from({
  email: undefined,
  token: undefined,
  username: undefined,
  isAdmin: undefined,
  id: undefined,
});

const reducer = duck.createReducer(
  {
    [LOGIN_RESPONSE]: (state, { payload }) =>
      state.merge({ ...payload }),
    [LOGOUT]: state =>
      state.merge({
        id: undefined,
        token: undefined,
        email: undefined,
        isAdmin: undefined,
        username: undefined,
      }),
  },
  INITIAL_STATE,
);

export const selectLogin = state => state.login;

export const selectEmail: SelectorCreator = createSelector(selectLogin, ({ email }) => email);
export const selectToken: SelectorCreator = createSelector(selectLogin, ({ token }) => token);
export const selectUsername: SelectorCreator = createSelector(
  selectLogin,
  ({ username }) => username,
);
export const selectHasAdminEntitlement: SelectorCreator = createSelector(
  selectLogin,
  ({ isAdmin }) => isAdmin,
);
export const getUserId: SelectorCreator = createSelector(selectLogin, ({ id }) => id);

export default reducer;
