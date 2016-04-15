import { call, put } from 'redux-saga/effects';
import { serverLoad } from '../actions';
import * as PersistenceEngine from './persistence/engine';

export default function* loadSaga() {
  yield put(serverLoad.request());
  const state = yield call(PersistenceEngine.load);
  yield put(serverLoad.success(state));
}
