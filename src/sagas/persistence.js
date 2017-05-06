import { call, spawn, put, select, take } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { serverSave, signalUnsavedChanges, signalSavedChanges } from '../actions';
import * as PersistenceEngine from './persistence/engine';
import { getPersistenceType, PersistenceType } from './persistence/whitelist';
import Lock from './utils/lock';

const DEBOUNCE_TIME = 3000; // debounce time in milisseconds

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// let's separate this function for better modularity
function *save(state, action) {
  yield put(serverSave.request(state));
  try {
    yield call(PersistenceEngine.save, state, action);
    yield put(serverSave.success());
  } catch (e) {
    yield put(serverSave.failure());
  }
}

function *debounceSave(state) {
  yield call(delay, DEBOUNCE_TIME);
  yield call(save, state);
}

// signals to the UI that there are unsaved changes
export function* signalPersistenceState() {
  yield put(signalUnsavedChanges());
  yield take(types.SERVER_SAVE_SUCCESS); // waits for a SERVER_SAVE success to continue
  yield put(signalSavedChanges());
}

export default function* persistenceSaga() {
  let debounceLock = new Lock(debounceSave);
  let unsavedLock = new Lock(signalPersistenceState);

  while (true) { //eslint-disable-line no-constant-condition
    const action = yield take();
    const type = getPersistenceType(action.type);

    if (!type) {
      continue;
    }

    const state = yield select();

    // each persistent action cancels the debounce timer
    yield debounceLock.cancel();

    // this lock prevents multiple unsaved changes actions from being dispatched
    yield unsavedLock.execute();

    if (type === PersistenceType.IMMEDIATE) {
      yield spawn(save, state);	// save immediately
    } else if (type === PersistenceType.DEBOUNCE) {
      // a new debounce timer is created
      yield debounceLock.execute(state, action);
    }
  }
}
