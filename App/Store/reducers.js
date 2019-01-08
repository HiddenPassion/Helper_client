// @flow
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import transform from './ImmutablePersistenceTransform';

import login from '../Modules/Login/Module/duck';
import university from '../Modules/University/Module/duck';
import subject from '../Modules/Subjects/Module/duck';
import lecturer from '../Modules/Lecturer/Module/duck';
import feedback from '../Modules/Feedbacks/Module/duck';

const transforms: any = [transform];

const authPersistConfig = {
  key: 'app',
  whitelist: ['login'],
  storage: AsyncStorage,
  transforms,
  debug: true,
  stateReconciler: autoMergeLevel1,
};

const reducers = {
  login,
  university,
  subject,
  lecturer,
  feedback,
};

const pReducer = persistReducer(
  authPersistConfig,
  combineReducers(reducers),
);

export default pReducer;
