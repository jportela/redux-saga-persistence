import { CLEAR_VIEWPORT, CREATE_IMAGE, SERVER_LOAD_SUCCESS, MOVE_IMAGE } from '../constants/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  images: []
};

export default function viewportReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

  case SERVER_LOAD_SUCCESS:
    return loadViewport(state, payload);
  case CLEAR_VIEWPORT:
    return clearViewport(state, payload);
  case CREATE_IMAGE:
    return createImage(state, payload);
  case MOVE_IMAGE:
    return moveImage(state, payload);
  default:
    return state;
  }
}

function loadViewport(state, payload) {
  if (!payload.viewport) {
    return state;
  }
  return update(state, {
    $set: payload.viewport
  });
}

function createImage(state, payload) {
  let img = {
    id: state.images.length,
    x: payload.x,
    y: payload.y,
    color: payload.color
  };

  return update(state, {
    images: {
      $push: [img]
    }
  });
}

function clearViewport(state) {
  return update(state, {
    images: {
      $set: []
    }
  });
}

function moveImage(state, payload) {
  const { id, x, y } = payload;
  return update(state, {
    images: {
      [id]: {
        x: { $set: x },
        y: { $set: y }
      }
    }
  });
}