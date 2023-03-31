import types from './types';

export const uploadImage = (imageFile) => {
return (dispatch) => {
const reader = new FileReader();
reader.readAsDataURL(imageFile);

reader.onload = () => {
  const base64Image = reader.result;

  fetch('http://localhost:5100/palettes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: base64Image })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: types.UPLOAD_IMAGE_SUCCESS, payload: data, img: base64Image });
    })
    .catch((error) => {
      dispatch({ type: types.UPLOAD_IMAGE_FAILURE, payload: error });
    });
};
};
};