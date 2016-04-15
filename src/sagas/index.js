import { fork } from 'redux-saga/effects';

import load from './load';
import persistence from './persistence';

export default function* root() {
  yield[
    fork(load),
    fork(persistence)
  ];
}
