// @flow
import Immutable from 'seamless-immutable';
import { createTransform } from 'redux-persist';

const fromImmutable = (state) => {
  if (state.hasOwnProperty('asMutable') && typeof state.asMutable === 'function') {
    return state.asMutable({ deep: true });
  }
  return state;
};

export default createTransform(
  state =>
    fromImmutable(state),
  state =>
    Immutable.from(state),
);
