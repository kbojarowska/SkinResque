import axios from 'axios';
import types from './types';

export const uploadImage = (imageFile) => {
  return (dispatch) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = () => {
      const base64Image = reader.result;

      axios.post('http://localhost:5100/palettes', { image: base64Image }, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => {
          dispatch({ type: types.UPLOAD_IMAGE_SUCCESS, payload: response.data.palettes, skin: response.data.skin, img: base64Image });
        })
        .catch((error) => {
          dispatch({ type: types.UPLOAD_IMAGE_FAILURE, payload: error });
        });
    };
  };
};