import types from './types';

export const userReducer = (state = [], action) => {
	switch (action.type) {
		case types.CREATE_USER_SUCCESS:
			return [state, ...action.payload];
		case types.CREATE_USER_FAILURE:
			return state;
		default:
			return state;
	};
};
