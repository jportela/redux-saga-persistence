import { combineReducers } from 'redux';
import viewport from './viewport';
import ui from './ui';

const rootReducer = combineReducers({
  viewport,
  ui
});

export default rootReducer;
