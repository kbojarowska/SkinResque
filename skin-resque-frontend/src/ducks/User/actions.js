import axios from 'axios';
import types from './types';

const URL = 'http://localhost:5000/users';

export const createUser = (user) => {
	return (dispatch) => {
		console.log(dispatch);
		return axios.post(URL, user)
			.then((response) => {
				dispatch({ type: types.CREATE_USER_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: types.CREATE_USER_FAILURE, payload: error });
			});
	};
};