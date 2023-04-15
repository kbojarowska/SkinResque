import axios from 'axios';
import types from './types';

const URL = 'http://localhost:5000/users';

export const createUser = (user) => {
	return (dispatch) => {
		return axios.post(URL, user)
			.then((response) => {
				dispatch({ type: types.CREATE_USER_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: types.CREATE_USER_FAILURE, payload: error });
			});
	};
};

export const deleteProfilePicture = (user) => {
	return (dispatch) => {
		return axios.delete(`${URL}/profile-picture/${user._id}?token=${user.token}`)
		.then((response) => {
			window.location.reload();
			dispatch({ type: types.DELETE_PROFILE_PICTURE_SUCCESS, payload: response.data});
		})
		.catch((error) => {
			dispatch({ type: types.DELETE_PROFILE_PICTURE_FAILURE, payload: error });
		});
	};
};