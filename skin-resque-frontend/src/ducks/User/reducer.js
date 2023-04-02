import types from './types';

export const usersReducer = (state = [], action) => {
    switch(action.type) {
		case types.CREATE_USER_REQUEST:
			return
        case types.CREATE_USER_SUCCESS:
			alert('Succesfully signed up. You can now sign in');
            return [state, ...action.payload];
        case types.CREATE_USER_FAILURE:
            return alert('error in creating user');
        default:
            return state;
    }
}
