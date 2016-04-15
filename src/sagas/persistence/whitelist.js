import * as types from '../../constants/ActionTypes';

export const PersistenceType = {
  IMMEDIATE: 'IMMEDIATE',
  DEBOUNCE: 'DEBOUNCE'
};

const Whitelist = {
  [types.CREATE_IMAGE]: PersistenceType.IMMEDIATE,
  [types.CLEAR_VIEWPORT]: PersistenceType.IMMEDIATE,
  [types.MOVE_IMAGE]: PersistenceType.DEBOUNCE
};

export function getPersistenceType(type) {
  return Whitelist[type] || null;
}
