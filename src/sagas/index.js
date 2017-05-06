import { fork, all } from 'redux-saga/effects';

import load from './load';
import persistence from './persistence';

export default function* root() {
  yield all([
    fork(load),
    fork(persistence)
  ]);
}
