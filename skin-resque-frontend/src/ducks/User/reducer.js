import types from './types';

export const usersReducer = (state = [], action) => {
    switch(action.type) {
		case types.CREATE_USER_REQUEST:
			console.log('dupa')
			return 'dfgff'
        case types.CREATE_USER_SUCCESS:
			console.log('success')
			alert('Succesfully signed up. You can now sign in');
            return [state, ...action.payload];
        case types.CREATE_USER_FAILURE:
			console.log('failure')
            return alert('error in creating user');
        default:
            return state;
    }
}
