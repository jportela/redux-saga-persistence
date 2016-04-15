
// simple save/load from the localStorage
// a Promise wouldn't even be needed, but this way it shows how it can easily
// be adapted for asynchronous IO (ie: AJAX requests to the server)

const STORAGE_KEY = 'persistence';

export function save(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return Promise.resolve({});
}

export function load() {
  const state = window.localStorage.getItem(STORAGE_KEY);
  return Promise.resolve(state ? JSON.parse(state) : {});
}
