import { cancel, spawn } from 'redux-saga/effects';

export default class Lock {
  constructor(func) {
    this.task = null;
    this.func = func;
  }

  * execute(...args) {
    // if the task is running, don't execute it again
    if (this.task && this.task.isRunning()) {
      return;
    }
    this.task = yield spawn(this.func, ...args);
  }

  * cancel() {
    if (this.task) {
      yield cancel(this.task);
    }
  } 
}
