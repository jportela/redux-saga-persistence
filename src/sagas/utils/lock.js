import { cancel, fork } from 'redux-saga/effects';

export default class Lock {
  constructor(func) {
    this.isLocked = false;
    this.task = null;
    this.func = func;
  }

  * execute(...args) {
    if (!this.isLocked) {
      this.isLocked = true;
      this.task = yield fork(this.func, ...args);
      this.task.done.then(() => {
        this.isLocked = false;
      });
    }
  }

  * cancel() {
    if (this.task) {
      yield cancel(this.task);	// reset the delay timeout
    }
  }
}
