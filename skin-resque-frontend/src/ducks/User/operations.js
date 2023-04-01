import { createAction, RSAA } from 'redux-api-middleware';
import types from './types';

const URL = 'http://localhost:5000/users';

export const createUser = dispatch => (user) => {
	console.log('AAAAAAAAAAAAAA');
	return dispatch(createAction({
		[RSAA]: {
			endpoint: URL,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.CREATE_USER_REQUEST },
				{
					type: types.CREATE_USER_SUCCESS,
				},
				{
					type: types.CREATE_USER_FAILURE,
					payload: (action, state, res) => {
						return res
					}
				}
			],
			body: JSON.stringify(user)
		},
		onSuccess: () => { alert('Success') },
		onFailure: () => { alert('Failure') }
	}));
}

