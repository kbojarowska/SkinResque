import types from './types';

const initialState = {
    palettes: null,
    img: null,
    error: null,
  };

export const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.UPLOAD_IMAGE_SUCCESS:
        return { ...state, palettes: action.payload, img:action.img, error: null };
      case types.UPLOAD_IMAGE_FAILURE:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };