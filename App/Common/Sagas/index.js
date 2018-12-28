// @flow
import { fork, takeLatest, takeFirst } from 'redux-saga/effects';
import { type Pattern } from 'redux-saga';

export type FSA = { payload: any, meta?: any, type: string };
export type AnySaga = Generator<any, any, any>;
export type FSASagaCreator = (action: FSA) => AnySaga;

export const createWatchers = (chanel: Pattern, handler: FSASagaCreator) =>
  fork(function* watcher() {
    yield takeLatest(chanel, handler);
  });

export const createWatcherFirst = (chanel: Pattern, handler: FSASagaCreator) =>
  fork(function* watcher() {
    yield takeFirst(chanel, handler);
  });
